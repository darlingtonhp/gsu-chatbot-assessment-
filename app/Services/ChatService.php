<?php

namespace App\Services;

use App\Models\ChatSession;
use App\Models\KnowledgeBase;
use Orhanerday\OpenAi\OpenAi;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Exception;

class ChatService
{
    protected const FALLBACK_RESPONSES = [
        'en' => "I'm sorry, I couldn't find an answer to that in our knowledge base. Please contact GSU ICTS for more assistance.",
        'sn' => 'Ndine urombo, handina kuwana mhinduro iyi muknowledge base yedu. Ndapota taurai neGSU ICTS kuti mubatsirwe.',
        'nd' => 'Ngiyaxolisa, angitholanga impendulo yalokhu ku-knowledge base yethu. Sicela uxhumane leGSU ICTS ukuze uthole usizo.',
    ];

    protected const OUT_OF_SCOPE_RESPONSES = [
        'en' => 'I can only answer questions related to Gwanda State University (GSU), such as admissions, programmes, fees, academic calendar, library services, and ICT support.',
        'sn' => 'Ndinongopindura mibvunzo ine chekuita neGwanda State University (GSU), yakaita sekupinda chikoro, mapurogiramu, mari, karenda yezvidzidzo, raibhurari, neICT support.',
        'nd' => 'Ngingaphendula kuphela imibuzo ephathelene leGwanda State University (GSU), efana lokwamukelwa kwabafundi, izifundo, imali, ikhalenda yezifundo, ilabhulali, le-ICT support.',
    ];

    protected const GREETING_RESPONSES = [
        'en' => 'Welcome to GSU SmartAssist. Ask me anything about Gwanda State University, including admissions, programmes, fees, library services, or ICT support.',
        'sn' => 'Mauya kuGSU SmartAssist. Bvunzai chero mubvunzo une chekuita neGwanda State University, sekupinda chikoro, mapurogiramu, mari, raibhurari, kana ICT support.',
        'nd' => 'Wamukelekile kuGSU SmartAssist. Buza imibuzo ephathelene leGwanda State University, njengokwamukelwa, izifundo, imali, ilabhulali, kumbe i-ICT support.',
    ];

    protected const GSU_SCOPE_KEYWORDS = [
        'gsu',
        'gwanda',
        'gwanda state university',
        'university',
        'admission',
        'apply',
        'application',
        'programme',
        'program',
        'course',
        'faculty',
        'department',
        'fee',
        'fees',
        'tuition',
        'registration',
        'semester',
        'calendar',
        'academic',
        'library',
        'hostel',
        'accommodation',
        'campus',
        'transcript',
        'graduation',
        'exam',
        'icts',
        'ict',
        'support',
        'portal',
        'student',
        'lecturer',
        'bursar',
        'dean',
        'chancellor',
        'vice chancellor',
    ];

    protected const SHONA_HINTS = [
        'mhoro',
        'makadii',
        'ndapota',
        'zvinodiwa',
        'yunivhesiti',
        'mari',
        'ndatenda',
        'mapurogiramu',
        'zvidzidzo',
        'sei',
        'chii',
    ];

    protected const NDEBELE_HINTS = [
        'sawubona',
        'linjani',
        'unjani',
        'ngiyacela',
        'ngiyabonga',
        'imali',
        'izifundo',
        'isikolo',
        'kuyini',
        'kanjani',
        'ngifuna',
    ];

    /**
     * Get a response for the user's message.
     */
    public function getResponse(string $message, string $sessionId): string
    {
        $message = trim($message);
        $recentHistory = $this->getRecentSessionHistory($sessionId);
        $language = $this->detectLanguage($message, $recentHistory);
        $searchContext = $this->buildSearchContext($message, $recentHistory);

        if ($this->isGreetingOnly($message)) {
            $response = $this->getGreetingResponse($language);
        } elseif (! $this->isWithinGsuScope($searchContext, $recentHistory)) {
            $response = $this->getOutOfScopeResponse($language);
        } else {
            // 1. Check Knowledge Base with weighted matching first.
            $faq = $this->findBestKnowledgeBaseMatch($searchContext);

            if ($faq) {
                $response = $this->localizeFaqResponse($faq->answer, $language);
            } else {
                // 2. Try OpenAI with recent conversation context if API key is set.
                $response = $this->getAiResponse($message, $recentHistory, $language);
            }
        }

        // Log session for admin analysis.
        ChatSession::create([
            'session_id' => $sessionId,
            'message' => $message,
            'response' => $response,
        ]);

        return $response;
    }

    /**
     * Get all chat logs.
     */
    public function getLogs()
    {
        return ChatSession::latest()->get();
    }

    /**
     * Retrieve recent interactions for context-aware matching.
     *
     * @return array<int, array{message: string, response: string}>
     */
    protected function getRecentSessionHistory(string $sessionId, int $limit = 6): array
    {
        return ChatSession::query()
            ->where('session_id', $sessionId)
            ->latest()
            ->take($limit)
            ->get(['message', 'response'])
            ->reverse()
            ->values()
            ->map(fn (ChatSession $chat) => [
                'message' => $chat->message,
                'response' => $chat->response,
            ])
            ->all();
    }

    /**
     * For follow-up messages, include recent context in matching input.
     */
    protected function buildSearchContext(string $message, array $recentHistory): string
    {
        $userContext = collect($recentHistory)
            ->pluck('message')
            ->take(-2)
            ->implode(' ');

        if ($userContext === '') {
            return $message;
        }

        return $this->isLikelyFollowUp($message) ? trim($message.' '.$userContext) : $message;
    }

    /**
     * Score knowledge base entries by token overlap and lexical similarity.
     */
    protected function findBestKnowledgeBaseMatch(string $searchContext): ?KnowledgeBase
    {
        $queryTokens = $this->tokenize($searchContext);

        if ($queryTokens === []) {
            return null;
        }

        $bestMatch = null;
        $bestScore = 0.0;

        $knowledgeEntries = KnowledgeBase::query()->get([
            'category',
            'question',
            'answer',
            'keywords',
        ]);

        foreach ($knowledgeEntries as $entry) {
            $entryText = Str::lower(trim($entry->question.' '.$entry->keywords.' '.$entry->category));
            $entryTokens = $this->tokenize($entryText);

            $overlap = count(array_intersect($queryTokens, $entryTokens));
            $tokenScore = $overlap / max(count($queryTokens), 1);

            similar_text(Str::lower($searchContext), $entryText, $percent);
            $similarityScore = $percent / 100;

            $containsScore = Str::contains($entryText, Str::lower(trim($searchContext))) ? 1.0 : 0.0;

            $totalScore = ($tokenScore * 0.55) + ($similarityScore * 0.35) + ($containsScore * 0.10);

            if ($totalScore > $bestScore) {
                $bestScore = $totalScore;
                $bestMatch = $entry;
            }
        }

        return $bestScore >= 0.22 ? $bestMatch : null;
    }

    /**
     * Tokenize user and knowledge text for loose semantic matching.
     *
     * @return array<int, string>
     */
    protected function tokenize(string $text): array
    {
        $cleaned = Str::of(Str::lower($text))
            ->replaceMatches('/[^a-z0-9\\s]/', ' ')
            ->squish()
            ->value();

        if ($cleaned === '') {
            return [];
        }

        $stopWords = [
            'the',
            'and',
            'for',
            'with',
            'this',
            'that',
            'from',
            'your',
            'have',
            'what',
            'when',
            'where',
            'how',
            'about',
            'can',
            'you',
            'are',
            'was',
            'were',
            'will',
            'please',
            'tell',
            'give',
            'me',
        ];

        return array_values(array_filter(
            array_unique(explode(' ', $cleaned)),
            fn (string $token): bool => strlen($token) > 2 && ! in_array($token, $stopWords, true)
        ));
    }

    /**
     * Call OpenAI with conversational context when available.
     */
    protected function getAiResponse(string $message, array $recentHistory, string $language = 'en'): string
    {
        $apiKey = $this->getOpenAiKey();

        if (! $apiKey) {
            return $this->getFallbackResponse($language);
        }

        $historyContext = collect($recentHistory)
            ->map(fn (array $chat): string => "User: {$chat['message']}\nAssistant: {$chat['response']}")
            ->implode("\n");

        $messages = [
            [
                'role' => 'system',
                'content' => 'You are GSU SmartAssist for Gwanda State University (GSU). You must only answer GSU-related questions (admissions, programmes, fees, academic calendar, library, ICT support, campus services). If the user asks anything outside GSU scope, politely refuse and redirect them to ask a GSU-specific question. Always answer in '.$this->getLanguageName($language).'. Keep answers concise and factual.',
            ],
        ];

        if ($historyContext !== '') {
            $messages[] = [
                'role' => 'system',
                'content' => "Conversation context:\n".$historyContext,
            ];
        }

        $messages[] = [
            'role' => 'user',
            'content' => $message,
        ];

        try {
            $openAi = new OpenAi($apiKey);
            $chat = $openAi->chat([
                'model' => 'gpt-3.5-turbo',
                'messages' => $messages,
                'temperature' => 0.4,
                'max_tokens' => 400,
            ]);

            $decoded = json_decode($chat, true);
            $content = $decoded['choices'][0]['message']['content'] ?? null;

            if (is_string($content) && trim($content) !== '') {
                return trim($content);
            }

            return "I'm sorry, I'm having trouble processing that right now. Please try again or contact ICTS.";
        } catch (Exception $e) {
            Log::error('OpenAI Error: '.$e->getMessage());
            return "I'm technically unable to answer that at the moment. Please refer to our FAQs or contact support.";
        }
    }

    protected function getOpenAiKey(): ?string
    {
        $apiKey = trim((string) config('services.openai.key'));

        if ($apiKey === '' || $apiKey === 'your_openai_api_key_here') {
            return null;
        }

        return $apiKey;
    }

    protected function getLanguageName(string $language): string
    {
        return match ($language) {
            'sn' => 'Shona',
            'nd' => 'Ndebele',
            default => 'English',
        };
    }

    protected function detectLanguage(string $message, array $recentHistory = []): string
    {
        $text = Str::lower($message.' '.collect($recentHistory)->pluck('message')->take(-1)->implode(' '));

        if (Str::contains($text, ['[sn]', 'chiShona', 'shona'])) {
            return 'sn';
        }

        if (Str::contains($text, ['[nd]', 'isiNdebele', 'ndebele'])) {
            return 'nd';
        }

        $snScore = $this->countKeywordMatches($text, self::SHONA_HINTS);
        $ndScore = $this->countKeywordMatches($text, self::NDEBELE_HINTS);

        if ($snScore > 0 || $ndScore > 0) {
            return $snScore >= $ndScore ? 'sn' : 'nd';
        }

        return 'en';
    }

    protected function countKeywordMatches(string $text, array $keywords): int
    {
        $score = 0;

        foreach ($keywords as $keyword) {
            if (Str::contains($text, $keyword)) {
                $score++;
            }
        }

        return $score;
    }

    protected function isGreetingOnly(string $message): bool
    {
        $normalized = Str::of(Str::lower($message))
            ->replaceMatches('/[^a-z\\s]/', '')
            ->squish()
            ->value();

        if ($normalized === '') {
            return false;
        }

        $greetings = [
            'hi',
            'hello',
            'hey',
            'good morning',
            'good afternoon',
            'good evening',
            'mhoro',
            'makadii',
            'sawubona',
            'linjani',
        ];

        return in_array($normalized, $greetings, true);
    }

    protected function isWithinGsuScope(string $message, array $recentHistory = []): bool
    {
        $scopeText = Str::lower($message);

        if ($this->countKeywordMatches($scopeText, self::GSU_SCOPE_KEYWORDS) > 0) {
            return true;
        }

        if ($this->isLikelyFollowUp($message) && ! empty($recentHistory)) {
            $historyText = Str::lower(collect($recentHistory)->pluck('message')->take(-2)->implode(' '));
            return $this->countKeywordMatches($historyText, self::GSU_SCOPE_KEYWORDS) > 0;
        }

        return false;
    }

    protected function isLikelyFollowUp(string $message): bool
    {
        return str_word_count($message) <= 8
            || Str::contains(Str::lower($message), [
                'what about',
                'how about',
                'and',
                'also',
                'it',
                'that',
                'this',
                'those',
                'them',
                'there',
                'again',
                'more',
            ]);
    }

    protected function getFallbackResponse(string $language): string
    {
        return self::FALLBACK_RESPONSES[$language] ?? self::FALLBACK_RESPONSES['en'];
    }

    protected function getOutOfScopeResponse(string $language): string
    {
        return self::OUT_OF_SCOPE_RESPONSES[$language] ?? self::OUT_OF_SCOPE_RESPONSES['en'];
    }

    protected function getGreetingResponse(string $language): string
    {
        return self::GREETING_RESPONSES[$language] ?? self::GREETING_RESPONSES['en'];
    }

    protected function localizeFaqResponse(string $answer, string $language): string
    {
        if ($language === 'en') {
            return $answer;
        }

        $apiKey = $this->getOpenAiKey();
        if (! $apiKey) {
            return $answer;
        }

        try {
            $openAi = new OpenAi($apiKey);
            $chat = $openAi->chat([
                'model' => 'gpt-3.5-turbo',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'Translate the following university support response into '.$this->getLanguageName($language).'. Preserve meaning. Keep it concise.',
                    ],
                    [
                        'role' => 'user',
                        'content' => $answer,
                    ],
                ],
                'temperature' => 0.2,
                'max_tokens' => 350,
            ]);

            $decoded = json_decode($chat, true);
            $content = $decoded['choices'][0]['message']['content'] ?? null;

            return is_string($content) && trim($content) !== '' ? trim($content) : $answer;
        } catch (Exception $e) {
            Log::error('OpenAI Translation Error: '.$e->getMessage());
            return $answer;
        }
    }
}
