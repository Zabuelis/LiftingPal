<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Weight extends Model
{
    protected $table = 'weight';
    public $timestamps = false;
     protected $fillable = [
        'user_id',
        'date',
        'weight',
    ];
}
