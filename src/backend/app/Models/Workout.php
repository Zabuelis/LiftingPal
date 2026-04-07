<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Workout extends Model
{
        protected $table = 'workout';
    protected $primaryKey = 'workout_id';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'name',
    ];

    protected $casts = [
        'exercise_names' => 'array',
        'exercise_ids' => 'array',
    ];
}
