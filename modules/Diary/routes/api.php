<?php

use Illuminate\Support\Facades\Route;
use Modules\Diary\Http\Controllers\DiaryController;
use Modules\Transaction\Http\Controllers\BalanceController;
use Modules\Transaction\Http\Controllers\TransactionController;

/*
 *--------------------------------------------------------------------------
 * API Routes
 *--------------------------------------------------------------------------
 *
 * Here is where you can register API routes for your application. These
 * routes are loaded by the RouteServiceProvider within a group which
 * is assigned the "api" middleware group. Enjoy building your API!
 *
*/

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::get('/diaries', [DiaryController::class, 'index'])->name('diary.index');
    Route::get('/diary/{id}', [DiaryController::class, 'show'])->name('diary.show');
    Route::post('/diary', [DiaryController::class, 'store'])->name('diary.create');
    Route::put('/diary', [DiaryController::class, 'update'])->name('diary.update');
    Route::delete('/diary/{id}', [DiaryController::class, 'destroy'])->name('diary.delete');
});
