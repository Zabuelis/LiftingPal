<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function() {
    Route::post('/login', [AuthController::class, 'loginAdmin'])->name('login');
    Route::get('/', function (){
        return view('login');
    });
    Route::get('/login', function() {
        return view('login');
    });
});

Route::middleware('auth')->group(function(){
    Route::post('/logout', [AuthController::class, 'logoutAdmin'])->name('logout');
    Route::middleware('adminUser')->group(function (){
        Route::controller(AdminController::class)->group(function () {
            Route::get('/admin', 'view')->name('admin');
            Route::get('/admin/users', 'searchUser');
            Route::delete('/admin/user/{id}', 'deleteUser');
            Route::get('/admin/exercise/create', function (){
                return view('exercise_form');
            });
            Route::get('/admin/exercises', 'searchExercise');
            Route::post('/admin/exercise/create', 'createExercise');
            Route::delete('/admin/exercise/{id}', 'deleteExercise');
        });
    });
});
