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
    Route::post('/createExercise', [ExerciseController::class, 'create']);
    Route::get('/viewExercise', [ExerciseController::class, 'view']);
    Route::delete('/deleteExercise/{id}', [ExerciseController::class, 'delete']);
    Route::put('/updateExercise/{id}', [ExerciseController::class, 'update']);

    // Workout related routes
    Route::post('/createWorkout', [WorkoutController::class, 'create']);
    Route::get('/viewWorkout', [WorkoutController::class, 'view']);
    Route::delete('/deleteWorkout/{id}', [WorkoutController::class, 'delete']);

});