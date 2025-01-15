<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', 'App\Http\Controllers\AuthController@store');
Route::post('/logout', 'App\Http\Controllers\AuthController@destroy')->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/dashboard', 'App\Http\Controllers\AuthController@dashboard')->name('dashboard');
    Route::get('/dashboard-ps', 'App\Http\Controllers\AuthController@dashboardPs')->name('dashboard.ps');

    Route::middleware(['isAdmin'])->group(function () {
        Route::prefix('/rombel')->group(function () {
            Route::get('/', 'App\Http\Controllers\RombelController@index')->name('rombel.index');
            Route::post('/store', 'App\Http\Controllers\RombelController@store')->name('rombel.store');
            Route::get('/{id}', 'App\Http\Controllers\RombelController@show')->name('rombel.show');
            Route::put('/update/{id}', 'App\Http\Controllers\RombelController@update')->name('rombel.update');
            Route::delete('/delete/{id}', 'App\Http\Controllers\RombelController@destroy')->name('rombel.destroy');
        });
    
        Route::prefix('/rayon')->group(function () {
            Route::get('/', 'App\Http\Controllers\RayonController@index')->name('rayon.index');
            Route::post('/store', 'App\Http\Controllers\RayonController@store')->name('rayon.store');
            Route::get('/{id}', 'App\Http\Controllers\RayonController@show')->name('rayon.show');
            Route::put('/update/{id}', 'App\Http\Controllers\RayonController@update')->name('rayon.update');
            Route::delete('/delete/{id}', 'App\Http\Controllers\RayonController@destroy')->name('rayon.destroy');
        });
    
        Route::prefix('/student')->group(function () {
            Route::get('/', 'App\Http\Controllers\StudentController@index')->name('student.index');
            Route::post('/store', 'App\Http\Controllers\StudentController@store')->name('student.store');
            Route::get('/{id}', 'App\Http\Controllers\StudentController@show')->name('student.show');
            Route::put('/update/{id}', 'App\Http\Controllers\StudentController@update')->name('student.update');
            Route::delete('/delete/{id}', 'App\Http\Controllers\StudentController@destroy')->name('student.destroy');
        });
    
        Route::prefix('/user')->group(function () {
            Route::get('/pembimbing', 'App\Http\Controllers\UserController@pembimbing')->name('user.pembimbing');
            Route::get('/', 'App\Http\Controllers\UserController@index')->name('user.index');
            Route::post('/store', 'App\Http\Controllers\UserController@store')->name('user.store');
            Route::get('/{id}', 'App\Http\Controllers\UserController@show')->name('user.show');
            Route::put('/update/{id}', 'App\Http\Controllers\UserController@update')->name('user.update');
            Route::delete('/delete/{id}', 'App\Http\Controllers\UserController@destroy')->name('user.destroy');
        });
    
        Route::prefix('/late')->group(function () {
            Route::get('/', 'App\Http\Controllers\LateController@index')->name('late.index');
            Route::get('/student', 'App\Http\Controllers\LateController@student')->name('late.student');
            Route::post('/store', 'App\Http\Controllers\LateController@store')->name('late.store');
            Route::get('/{id}', 'App\Http\Controllers\LateController@detail')->name('late.detail');
            Route::get('student/{id}', 'App\Http\Controllers\LateController@show')->name('late.show');
            Route::put('/update/{id}', 'App\Http\Controllers\LateController@update')->name('late.update');
            Route::delete('/delete/{id}', 'App\Http\Controllers\LateController@destroy')->name('late.destroy');
        });

        Route::get('/export-admin', 'App\Http\Controllers\ExportController@exportAdmin')->name('export.admin');
    });

    Route::middleware(['isPembimbing'])->group(function () {
        Route::prefix('/pembimbing')->group(function () {
            Route::get('/student', 'App\Http\Controllers\StudentController@indexPs')->name('student.index.ps');
            Route::get('/late', 'App\Http\Controllers\LateController@indexPs')->name('late.index.ps');
            Route::get('/late/student', 'App\Http\Controllers\LateController@studentPs')->name('late.student.ps');
            Route::get('/late/student/{id}', 'App\Http\Controllers\LateController@showPs')->name('late.show.ps');
        });

        Route::get('/export-pembimbing', 'App\Http\Controllers\ExportController@exportPembimbing')->name('export.pembimbing');
    });

    Route::get('/download-pdf/{id}', 'App\Http\Controllers\PDFController@downloadPDF');
});
Route::get('/check', 'App\Http\Controllers\AuthController@show')->name('check');
