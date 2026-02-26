<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\KnowledgeBaseService;
use Illuminate\Http\Response;

class KnowledgeBaseController extends Controller
{
    protected $kbService;

    public function __construct(KnowledgeBaseService $kbService)
    {
        $this->kbService = $kbService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->kbService->getAll();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string',
            'question' => 'required|string',
            'answer' => 'required|string',
            'keywords' => 'nullable|string',
        ]);

        return $this->kbService->store($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $this->kbService->find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'category' => 'sometimes|string',
            'question' => 'sometimes|string',
            'answer' => 'sometimes|string',
            'keywords' => 'nullable|string',
        ]);

        return $this->kbService->update($id, $validated);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->kbService->delete($id);
        return response()->noContent();
    }
}
