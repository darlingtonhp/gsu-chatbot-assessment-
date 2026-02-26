<?php

namespace App\Services;

use App\Models\ChatSession;
use App\Models\KnowledgeBase;
use Orhanerday\OpenAi\OpenAi;
use Illuminate\Support\Facades\Log;
use Exception;

class ChatService
{
    /**
     * Get a response for the user's message.
     */
    public function getResponse(string $message, string $sessionId): string
    {
        // 1. Check Knowledge Base first
        $faq = KnowledgeBase::where('question', 'LIKE', "%{$message}%")
            ->orWhere('keywords', 'LIKE', "%{$message}%")
            ->first();

        if ($faq) {
            $response = $faq->answer;
        } else {
            // 2. Try OpenAI if API key is set
            $apiKey = config('services.openai.key');
            if ($apiKey) {
                try {
                    $open_ai = new OpenAi($apiKey);
                    $chat = $open_ai->chat([
                        'model' => 'gpt-3.5-turbo',
                        'messages' => [
                            ["role" => "system", "content" => "You are GSU SmartAssist, an intelligent university chatbot for Gwanda State University (GSU). Help students, staff, and applicants with admissions, programmes, fees, academic calendar, library services, and ICT support."],
                            ["role" => "user", "content" => $message],
                        ],
                        'temperature' => 0.7,
                        'max_tokens' => 500,
                    ]);

                    $d = json_decode($chat);
                    if (isset($d->choices[0]->message->content)) {
                        $response = $d->choices[0]->message->content;
                    } else {
                        $response = "I'm sorry, I'm having trouble processing that right now. Please try again or contact ICTS.";
                    }
                } catch (Exception $e) {
                    Log::error("OpenAI Error: " . $e->getMessage());
                    $response = "I'm technically unable to answer that at the moment. Please refer to our FAQs or contact support.";
                }
            } else {
                $response = "I'm sorry, I couldn't find an answer to that in our knowledge base. Please contact GSU ICTS for more assistance.";
            }
        }

        // Log Session
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
}
