<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TodoController;

use App\Http\Controllers\API\StudentController;


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);


Route::middleware(['auth:sanctum'])->group(function(){
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/logged_user', [UserController::class, 'logged_user']);
    Route::post('/addTodo',[TodoController::class,'addTodo']);
   // Route::get('/index/{user_id}',[TodoController::class,'index']);
    Route::post('/update/{id}',[TodoController::class,'update']);
    Route::delete('/delete/{id}',[TodoController::class,'delete']);
    Route::get('/edit/{todo_id}', [TodoController::class, 'edit']);
    // Route::get('/search/{key}', [TodoController::class, 'search']);
    Route::get('/find/{user_id}',[TodoController::class,'find']);
    
    
   

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});