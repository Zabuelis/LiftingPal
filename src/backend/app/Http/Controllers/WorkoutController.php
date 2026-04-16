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
    private $missingWorkoutErrorMsg = 'It appears you have no workouts... Start by adding a new one.';
    private $missingExercisesErrorMsg = 'Failed to create the workout. Provided exercises do not exist.';
    private $updateFailureErrorMsg = 'Failed to update the workout, please try again later.';

public function view(){
        // Join workout_exercise, workout, exercise tables to return object with field exercise_names
        $workouts = Workout::leftJoin('workout_exercise', 'workout.workout_id', '=', 'workout_exercise.workout_id')
            ->leftJoin('exercise', 'workout_exercise.exercise_id', '=', 'exercise.exercise_id')
            ->select('workout.*', 
                DB::raw("JSON_AGG(exercise.name) as exercise_names"),
                DB::raw("JSON_AGG(exercise.exercise_id) as exercise_ids"))
            ->where('workout.user_id', Auth::user()->user_id)
            ->where('workout_exercise.exercise_id', '!=', null)
            ->groupBy('workout.workout_id')
            ->orderBy('workout.name', 'asc')
            ->get();
            
        return response()->json([
            'workouts' => $workouts
        ]);
    }

    public function show($id){

    }

    public function create(Request $request){
        $validated = $request->validate([
            'name' => 'required',
            'exercise_ids' => 'required|array|min:1',
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
                'error' => $this->missingExercisesErrorMsg
            ], 400);
        }

        $workoutForm = [
            'user_id' => Auth::user()->user_id,
            'name' => $validated['name'],
        ];
        // Tie workout with exercises (M->N) using Workout_Exercise table
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

    public function update(Request $request, $id){
        $validated = $request->validate([
            'name' => 'required',
            'exercise_ids' => 'required|array|min:1',
        ]);

        try {
            $workout = Workout::where('workout_id', $id)->where('user_id', Auth::user()->user_id)->firstOrFail();
        } catch (Exception $e) {
            Log::error("Workout update failed", [
                'message' => $e,
            ]);
            return response()->json([
                'error' => $this->updateFailureErrorMsg
            ], 400);
        }

        foreach($validated['exercise_ids'] as $exercise_id){
            if(Exercise::where('exercise_id', $exercise_id)->where('user_id', Auth::user()->user_id)->doesntExist()){
                return response()->json([
                    'error' => $this->updateFailureErrorMsg
                ], 400);
            }
        }

        $workout->name = $validated['name'];
        $workout->update();

        // Handle a situation where exercise or workout is deleted mid update
        try {
            WorkoutExercise::where('workout_id', $id)->delete();

            foreach($validated['exercise_ids'] as $exercise_id){
                WorkoutExercise::insert([
                    'workout_id' => $id,
                    'exercise_id' => $exercise_id,
                ]);
            }

            return response()->json([
                'success' => 'Workout updated successfully.'
            ]);
        } catch (Exception $e) {
            Log::error("Workout or exercise was removed mid update", [
                'message' => $e,
            ]);
            return response()->json([
                'error' => $this->updateFailureErrorMsg
            ]);
        }

    }

    public function delete($id){
        try {
            Workout::where('workout_id', $id)->where('user_id', Auth::user()->user_id)->delete();
            return response()->json([
                'success' => 'Workout removed successfully.'
            ]);
        } catch (Exception $e) {
            Log::error("Workout delete failed", [
                'message' => $e,
            ]);
            return response()->json([
                'error' => 'Failed to remove the workout. Please try again later...'
            ], 400);
        }
    }
}
