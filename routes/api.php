<?php

use App\Http\Controllers\NetworkLogController;
use App\Http\Controllers\AlertController;
use App\Http\Controllers\MLModelController;
use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // API v1 routes with prefix & names to avoid conflicts
    Route::prefix('v1')->as('api.v1.')->group(function () {
        Route::apiResource('network-logs', NetworkLogController::class);
        Route::apiResource('alerts', AlertController::class);
        Route::apiResource('ml-models', MLModelController::class);

        Route::get('dashboard/stats', [DashboardController::class, 'index'])->name('dashboard.stats');
    });
});
