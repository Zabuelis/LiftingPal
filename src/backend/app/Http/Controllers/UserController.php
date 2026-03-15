<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class UserController extends Controller
{

    // Return authenticated user information
    public function show(){
        $user = Auth::user();

        return response([
            'user' => $user
        ]);
    }
}


