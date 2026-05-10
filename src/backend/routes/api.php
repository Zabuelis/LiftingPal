<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\WorkoutSessionController;
use Illuminate\Support\Facades\Route;

// Routes for guest users
Route::middleware('guestUser')->group(function (){
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});

// Routes for authenticated users
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // User related routes
    Route::controller(UserController::class)->group(function (){
        Route::get('/getUserData', 'show');
        Route::put('/updateBodyStats', 'updateBodyStats');
        Route::get('/getUserTotals', 'userTotals');
        Route::get('/getWeekTime', 'weekTimeDifference');
    });

    // Exercise related routes
    Route::controller(ExerciseController::class)->group(function (){
        Route::get('/viewExercise', 'view');
        Route::post('/createExercise', 'create');
        Route::delete('/deleteExercise/{id}', 'delete');
        Route::put('/updateExercise/{id}', 'update');
        Route::get('/viewPublicExercise', 'showPublic');
        Route::post('/addPublicExercise/{id}', 'addPublicExercise');
    });

    // Workout related routes
    Route::controller(WorkoutController::class)->group(function(){
        Route::post('/createWorkout', 'create');    
        Route::get('/viewWorkout', 'view');
        Route::delete('/deleteWorkout/{id}', 'delete');
        Route::put('/updateWorkout/{id}', 'update');
    });

    Route::controller(WorkoutSessionController::class)->group(function(){
        Route::post('/createWorkoutSession', 'create');
        Route::get('/viewWorkoutSession', 'view');
        Route::delete('/deleteWorkoutSession/{id}', 'delete');
        Route::put('/updateWorkoutSession/{id}', 'update');
        Route::get('/showWorkoutSession/{id}', 'show');
        Route::get('/viewActivity', 'viewActivity');
    });

});