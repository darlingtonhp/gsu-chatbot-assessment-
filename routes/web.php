<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'admin', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->group(function () {
    // Admin Pages
    Route::get('/admin/knowledge-base', function () {
        return Inertia::render('Admin/KnowledgeBase');
    })->name('admin.faqs');

    Route::get('/admin/chat-logs', function () {
        return Inertia::render('Admin/ChatLogs');
    })->name('admin.logs');
});

// Public Pages
Route::get('/chat', function () {
    return Inertia::render('Chat/Index');
})->name('chat');

Route::get('/faqs', function () {
    return Inertia::render('FAQ/Library');
})->name('faqs');

require __DIR__ . '/auth.php';
