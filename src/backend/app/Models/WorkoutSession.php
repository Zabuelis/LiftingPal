<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutSession extends Model
{
        protected $table = 'workout_session';
    protected $primaryKey = 'session_id';
    public $timestamps = false;

    protected  $fillable = [
        'user_id', 'workout_id', 'date', 'duration', 'comments', 'caption'
    ];
}
