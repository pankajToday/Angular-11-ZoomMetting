<?php

use App\Http\Controllers\ZoomAPIController;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get("zoom/all-meeting",[ZoomAPIController::class ,'getAllMeeting']);
Route::post("zoom/create-meeting",[ZoomAPIController::class ,'store']);
Route::get("zoom/view-meeting/{id}",[ZoomAPIController::class ,'viewMeeting']);
Route::post("zoom/update-meeting",[ZoomAPIController::class ,'UpdateMeeting']);
Route::post("zoom/delete-meeting/{id}",[ZoomAPIController::class ,'deleteMeeting']);
