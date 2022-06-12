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
    Route::resource('families', 'FamilyController');
    Route::resource('families/{id}/houseWorks', 'HouseWorkController');
    Route::resource('families/{id}/users', 'UserController');
    Route::resource('users/{id}/rewards', 'RewardController');
    Route::resource('pointHistories', 'PointHistoryController');
    Route::resource('inquiries', 'InquiryController');
    Route::post('inquiries/{id}/reply', 'InquiryController@reply');
});
