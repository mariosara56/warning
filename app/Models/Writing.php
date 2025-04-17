<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Writing extends Model
{
    protected $fillable = [
        'thumbnail',
        'title',
        'slug',
        'teaser',
        'body',
        'meta_title',
        'meta_description',
        'author',
    ];
}
