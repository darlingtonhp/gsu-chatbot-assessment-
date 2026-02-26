<?php

namespace App\Services;

use App\Models\KnowledgeBase;
use Illuminate\Database\Eloquent\Collection;

class KnowledgeBaseService
{
    /**
     * Get all knowledge base entries.
     */
    public function getAll(): Collection
    {
        return KnowledgeBase::all();
    }

    /**
     * Store a new knowledge base entry.
     */
    public function store(array $data): KnowledgeBase
    {
        return KnowledgeBase::create($data);
    }

    /**
     * Get a specific knowledge base entry.
     */
    public function find(string $id): KnowledgeBase
    {
        return KnowledgeBase::findOrFail($id);
    }

    /**
     * Update a specific knowledge base entry.
     */
    public function update(string $id, array $data): KnowledgeBase
    {
        $kb = $this->find($id);
        $kb->update($data);
        return $kb;
    }

    /**
     * Delete a specific knowledge base entry.
     */
    public function delete(string $id): bool
    {
        $kb = $this->find($id);
        return $kb->delete();
    }
}
