<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'AuthController@login');
Route::middleware('auth:sanctum')->group(function () {
    Route::resource('families', 'FamilyController', ['only' => ['index', 'show', 'update', 'destroy']]);
    Route::resource('families/{id}/houseWorks', 'HouseWorkController', ['only' => ['index', 'destroy']]);
    Route::resource('families/{id}/users', 'UserController', ['only' => ['show', 'update', 'destroy']]);
    Route::resource('users/{id}/rewards', 'RewardController', ['only' => ['index', 'destroy']]);
    Route::resource('pointHistories', 'PointHistoryController', ['only' => ['index', 'destroy']]);
    Route::resource('inquiries', 'InquiryController', ['only' => ['index', 'show', 'update', 'destroy']]);
    Route::post('inquiries/{id}/reply', 'InquiryController@reply');
    Route::resource('operators', 'OperatorController', ['only' => ['index','store', 'show', 'update', 'destroy']]);
    Route::put('operators/{id}/resetPassword', 'OperatorController@resetPassword');
});
