<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkoutController;
use Illuminate\Support\Facades\Route;

// Routes for guest users
Route::middleware('guestUser')->group(function (){
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});

// Routes for authenticated users
Route::middleware('auth:sanctum')->group(function () {
    // User related routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/getUserData', [UserController::class, 'show']);

    // Exercise related routes
    Route::controller(ExerciseController::class)->group(function (){
        Route::get('/viewExercise', 'view');
        Route::post('/createExercise', 'create');
        Route::delete('/deleteExercise/{id}', 'delete');
        Route::put('/updateExercise/{id}', 'update');
    });

    // Workout related routes
    Route::controller(WorkoutController::class)->group(function(){
        Route::post('/createWorkout', 'create');    
        Route::get('/viewWorkout', 'view');
        Route::delete('/deleteWorkout/{id}', 'delete');
        Route::put('/updateWorkout/{id}', 'update');
    });

});