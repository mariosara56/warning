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

    public function expertise()
    {
        return $this->hasMany(Expertise::class, 'user_id');
    }

    public function experienceEducation()
    {
        return $this->hasMany(ExperienceEducation::class, 'user_id');
    }
}
