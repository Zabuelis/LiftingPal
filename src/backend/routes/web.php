<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function() {
    Route::post('/login', [AuthController::class, 'loginAdmin'])->name('login');
    Route::get('/', function (){
        return view('login');
    });
});

Route::middleware('auth')->group(function(){
    Route::post('/logout', [AuthController::class, 'logoutAdmin'])->name('logout');
    Route::get('/admin', function (){
        return view('admin');
    })->name('admin');
    // Route::middleware('isAdmin')
});
