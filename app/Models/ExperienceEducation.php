<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExperienceEducation extends Model
{
    protected $table = 'experience_educations';

    protected $fillable = [
        'type',
        'title',
        'company_institution',
        'location',
        'start_date',
        'end_date',
        'description',
        'achievements_or_grade',
        'skill_id',
        'reason_for_leaving',
        'user_id',
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
