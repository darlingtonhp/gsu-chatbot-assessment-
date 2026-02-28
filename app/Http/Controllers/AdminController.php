<?php

namespace App\Http\Controllers;

use App\Models\ChatSession;
use App\Models\KnowledgeBase;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function dashboard(): Response
    {
        return Inertia::render('Dashboard', [
            'stats' => $this->buildDashboardStats(),
        ]);
    }

    public function chatLogsPage(): Response
    {
        return Inertia::render('Admin/ChatLogs', [
            'initialLogs' => $this->getChatLogs(),
        ]);
    }

    public function chatLogs(): JsonResponse
    {
        return response()->json($this->getChatLogs());
    }

    /**
     * @return array<int, ChatSession>
     */
    protected function getChatLogs(): array
    {
        return ChatSession::query()
            ->latest()
            ->get()
            ->all();
    }

    /**
     * @return array{faqs: int, chats: int, sessions: int, categories: int, latestActivity: ?string}
     */
    protected function buildDashboardStats(): array
    {
        return [
            'faqs' => KnowledgeBase::query()->count(),
            'chats' => ChatSession::query()->count(),
            'sessions' => ChatSession::query()->distinct()->count('session_id'),
            'categories' => KnowledgeBase::query()
                ->whereNotNull('category')
                ->where('category', '!=', '')
                ->distinct()
                ->count('category'),
            'latestActivity' => optional(ChatSession::query()->latest()->first())->created_at?->toIso8601String(),
        ];
    }
}
