<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\KnowledgeBaseController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Chat API
Route::post('/chat', [ChatController::class, 'chat'])->middleware('throttle:60,1');

// FAQ API (Public)
Route::get('/faqs', [KnowledgeBaseController::class, 'index']);

// Admin API (Protected)
Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    Route::apiResource('faqs', KnowledgeBaseController::class)->except(['index']);
    Route::get('/chat-logs', [ChatController::class, 'logs']);
});
