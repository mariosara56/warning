<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    protected $fillable = [
        'fullname',
        'email',
        'phone',
        'instagram',
        'linkedin',
        'description',
        'photo',
        'work',
        'is_active',
    ];
}
