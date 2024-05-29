<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/{fe_capture?}', function () {
    return view('app');
})->where('fe_capture', '^(?!api).*$');
