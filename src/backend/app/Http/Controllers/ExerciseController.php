<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Exercise;
use Exception;
use Illuminate\Support\Facades\Log;

class ExerciseController extends Controller
{
    public function view(){
        $exercises = Exercise::where('user_id', Auth::user()->user_id)->orderBy('name', 'asc')->get();
        if(count($exercises) === 0){
            return response()->json([
                'error' => 'It appears you have no exercises... Start by adding a new one.'
            ]);
        } else{
            return response()->json([
                'exercises' => $exercises
            ]);
        }
    }

    public function show($id){

    }

    public function create(Request $request){
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable',
        ]);

        $validated['user_id'] = Auth::user()->user_id;

        try {
            Exercise::create($validated);
            return response()->json([
                'success' => 'Exercise created successfully.'
            ]);
        } catch (Exception $e) {
             Log::error("Exercise record creation error", [
                'message' => $e->getMessage(),
            ]);
            return response()->json([
                'error' => 'Failed to create the exercise, please try again later.'
            ], 400);
        }
    }

    // Logic here could be improved
    public function update(Request $request, $id){
        if($request->name == "" && $request->description == ""){
            return response()->json([
                'error' => 'Failed to update the exercise, please try again later.'
            ], 400);
        }

        $exercise = Exercise::where('exercise_id', $id)->where('user_id', Auth::user()->user_id)->firstOrFail();
        if(!$exercise){
            return response()->json([
                'error' => 'Failed to update the exercise, please try again later.'
            ], 400);
        }

        if($request->name != ""){
            $exercise->name = $request->name;
        }
        if($request->description != ""){
            $exercise->description = $request->description;
        }
        $exercise->update();

        return response()->json([
            'success' => 'Exercise updated successfully.'
        ]);
    }

    public function delete($id){
        if(Exercise::where('exercise_id', $id)->where('user_id', Auth::user()->user_id)->delete()){
            return response()->json([
                'success' => 'Exercise removed successfully.'
            ]);
        } else{
            return response()->json([
                'error' => 'Failed to remove selected exercise.'
            ], 400);
        }
    }
}
