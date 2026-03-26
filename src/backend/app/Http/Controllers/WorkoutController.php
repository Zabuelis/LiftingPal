<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exercise;
use App\Models\Workout;
use App\Models\WorkoutExercise;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Exception;

class WorkoutController extends Controller
{
    public function view(){
        // Join workout_exercise, workout, exercise tables to return object with field exercise_names
        $workouts = Workout::leftJoin('workout_exercise', 'workout.workout_id', '=', 'workout_exercise.workout_id')
            ->leftJoin('exercise', 'workout_exercise.exercise_id', '=', 'exercise.exercise_id')
            ->select('workout.*', DB::raw("STRING_AGG(exercise.name, ', ') as exercise_names"))
            ->where('workout.user_id', Auth::user()->user_id)
            ->groupBy('workout.workout_id')
            ->orderBy('workout.name', 'asc')
            ->get();
        if(count($workouts) === 0){
            return response()->json([
                'error' => 'It appears you have no workouts... Start by adding a new one.'
            ]);
        } else{
             return response()->json([
                'workouts' => $workouts
            ]);
        }

    }

    public function show($id){

    }

    public function create(Request $request){
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'exercise_ids' => 'required|array',
        ]);

        // Validate if all provided exercises exist and belong to the user.
        try {
            foreach($validated['exercise_ids'] as $exercise_id){
                Exercise::where('exercise_id', $exercise_id)->where('user_id', Auth::user()->user_id)->firstOrFail();
            }
        } catch (Exception $e) {
            Log::error("Exercises validation in workout failed", [
                'message' => $e->getMessage(),
            ]);
            return response()->json([
                'error' => 'Failed to create the workout. Provided exercises do not exist.'
            ], 400);
        }

        $workoutForm = [
            'user_id' => Auth::user()->user_id,
            'name' => $validated['name'],
            'description' => $validated['description'],
        ];
        // Tie workout with exercises (M->N) using WorkoutExercise table
        try {
            $workout = Workout::create($workoutForm);

            foreach($validated['exercise_ids'] as $exercise_id){
                WorkoutExercise::insert([
                    'workout_id' => $workout['workout_id'],
                    'exercise_id' => $exercise_id,
                ]);
            }

            return response()->json([
                'success' => 'Workout created successfully.'
            ]);
        } catch (Exception $e) {
            if(count($workout) !== 0){
                $workout->delete();
            }
            Log::error("Workout insert failed", [
                'message' => $e,
            ]);
            return response()->json([
                'error' => 'Failed to create the workout, please try again later.'
            ], 400);
        }
        
    }

    public function update($id){

    }

    public function delete($id){
        if(Workout::where('workout_id', $id)->where('user_id', Auth::user()->user_id)->delete()){
            return response()->json([
                'success' => 'Workout removed successfully.'
            ]);
        } else{
            return response()->json([
                'error' => 'Failed to remove the workout. Please try again later...'
            ], 400);
        }
    }
}
