<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expertise extends Model
{
    protected $fillable = [
        'user_id', 'skill_id', 'level',
        'years_of_experience', 'certified', 'notes'
    ];

    public function skill()
    {
        return $this->belongsTo(Skill::class);
    }

    public function about()
    {
        return $this->belongsTo(About::class, 'user_id');
    }
}
