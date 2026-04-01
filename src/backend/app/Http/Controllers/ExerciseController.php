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
            'description' => 'nullable|max:128',
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

    public function update(Request $request, $id){
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'nullable'
        ]);

        try {
            $exercise = Exercise::where('exercise_id', $id)->where('user_id', Auth::user()->user_id)->firstOrFail();   
        } catch (Exception $e) {
            Log::error("Exercise record update error", [
                'message' => $e->getMessage(),
            ]);
            return response()->json([
                'error' => 'Failed to update the exercise, please try again later.'
            ], 400);
        }

        $exercise->name = $validated['name'];
        if(!empty($validated['description'])){
            $exercise->description = $validated['description'];
        } else {
            $exercise->description = null;
        }
        $exercise->update();

        return response()->json([
            'success' => 'Exercise updated successfully.'
        ]);
    }

    public function delete($id){
        try {
            Exercise::where('exercise_id', $id)->where('user_id', Auth::user()->user_id)->delete();
            return response()->json([
                'success' => 'Exercise removed successfully.'
            ]);
        } catch (Exception $e) {
            Log::error("Exercise record delete error", [
                'message' => $e->getMessage(),
            ]);
            return response()->json([
                'error' => 'Failed to remove selected exercise.'
            ], 400);
        }
    }
}
