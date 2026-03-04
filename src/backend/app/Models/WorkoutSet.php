<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutSet extends Model
{
        protected $table = 'workout_set';
    protected $primaryKey = 'set_id';
    public $timestamps = false;
}
