<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Routes for authentication
Route::controller(AuthController::class)->group(function (){
    Route::post('/login', 'login');
    Route::post('/register', 'register');
});

// Routes prottected by authentication
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/getUserData', [UserController::class, 'show']);
});