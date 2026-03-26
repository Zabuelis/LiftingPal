<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutExercise extends Model
{
        protected $table = 'workout_exercise';
    public $timestamps = false;
    protected $fillable = [
        'workout_id',
        'exercise_id',
    ];
}
