<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrganizeActivityController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\JoinActivityController;
use App\Http\Controllers\MessageController;
use App\Models\OrganizeActivity;

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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/OrganizeActivity',[OrganizeActivityController::class,'index']);

Route::put('/members/update', [MemberController::class,'update']);

Route::get('/organizeActivities', [JoinActivityController::class,'organizeActivities']);

Route::post('/createActivity' , [OrganizeActivityController::class,'createActivity']);

Route::get('/createactivity' , [OrganizeActivityController::class, 'getUser']);

Route::get('/joinActivities', [JoinActivityController::class,'joinActivities']);

Route::post('/joinActivities/update/{activityId}/{memberId}', [JoinActivityController::class,'update']);

Route::post('/joinActivities', [JoinActivityController::class,'store']);

Route::get('/favoriteActivities', [JoinActivityController::class,'favoriteActivities']);

Route::get('/activities/{activity_id}', [ActivityController::class,'index']);

Route::get('/activities/{activity_id}/timediff', [ActivityController::class,'timediff']);

Route::get('/joinActivities/{activity_id}', [JoinActivityController::class,'reviewActivities']);

Route::get('/notify', [OrganizeActivityController::class,'notify']);

Route::post('/messages',[MessageController::class,'store']);

Route::get('/messages',[MessageController::class,'index']);

