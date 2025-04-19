<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = ['name', 'category', 'type'];

    public function expertise()
    {
        return $this->hasMany(Expertise::class);
    }
}
