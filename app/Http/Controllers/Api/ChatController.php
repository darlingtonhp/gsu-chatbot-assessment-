<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ChatService;
use Illuminate\Http\JsonResponse;

class ChatController extends Controller
{
    protected $chatService;

    public function __construct(ChatService $chatService)
    {
        $this->chatService = $chatService;
    }

    /**
     * Handle the incoming chat message.
     */
    public function chat(Request $request): JsonResponse
    {
        $request->validate([
            'message' => 'required|string',
            'session_id' => 'required|string',
        ]);

        $response = $this->chatService->getResponse(
            $request->message,
            $request->session_id
        );

        return response()->json([
            'response' => $response,
            'session_id' => $request->session_id,
        ]);
    }

    /**
     * Display chat logs for admin.
     */
    public function logs()
    {
        return $this->chatService->getLogs();
    }
}
