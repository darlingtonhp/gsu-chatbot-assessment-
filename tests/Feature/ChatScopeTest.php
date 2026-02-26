<?php

namespace Tests\Feature;

use App\Models\KnowledgeBase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChatScopeTest extends TestCase
{
    use RefreshDatabase;

    public function test_out_of_scope_question_is_restricted(): void
    {
        $response = $this->postJson('/api/chat', [
            'message' => 'What is the Bitcoin price today?',
            'session_id' => 'scope-test-1',
        ]);

        $response
            ->assertOk()
            ->assertJsonPath(
                'response',
                'I can only answer questions related to Gwanda State University (GSU), such as admissions, programmes, fees, academic calendar, library services, and ICT support.'
            );
    }

    public function test_gsu_scoped_question_returns_kb_answer(): void
    {
        KnowledgeBase::query()->create([
            'category' => 'Programmes',
            'question' => 'What programmes are available at GSU?',
            'answer' => 'GSU offers programmes in Engineering, Agriculture, Commerce, and Information Sciences.',
            'keywords' => 'programmes, courses, faculties',
        ]);

        $response = $this->postJson('/api/chat', [
            'message' => 'What programmes are currently available at GSU?',
            'session_id' => 'scope-test-2',
        ]);

        $response
            ->assertOk()
            ->assertJsonPath(
                'response',
                'GSU offers programmes in Engineering, Agriculture, Commerce, and Information Sciences.'
            );
    }

    public function test_shona_greeting_returns_shona_prompt(): void
    {
        $response = $this->postJson('/api/chat', [
            'message' => 'Mhoro',
            'session_id' => 'scope-test-3',
        ]);

        $response
            ->assertOk()
            ->assertJsonPath(
                'response',
                'Mauya kuGSU SmartAssist. Bvunzai chero mubvunzo une chekuita neGwanda State University, sekupinda chikoro, mapurogiramu, mari, raibhurari, kana ICT support.'
            );
    }
}
