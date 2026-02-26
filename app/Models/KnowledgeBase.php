<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KnowledgeBase extends Model
{
    protected $fillable = [
        'category',
        'question',
        'answer',
        'keywords',
    ];
}
