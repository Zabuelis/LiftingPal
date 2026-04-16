<?php

namespace App\Http\Controllers;

use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Workout;
use App\Models\Exercise;
use App\Models\WorkoutSession;
use App\Models\WorkoutSet;
use Exception;

class WorkoutSessionController extends Controller
{

    private $errorMsg = "There was an error processing your request. Please try again...";
    public function view(){
        $workoutSessions = WorkoutSession::where('user_id', Auth::user()->user_id)->get();

        return response()->json([
            'workoutSessions' => $workoutSessions
        ]);
    }

    public function show($id){}

    public function create(Request $request){
        $validated = $request->validate([
            'workout_id' => 'required',
            'date' => 'required|date',
            'duration' => 'required|date_format:H:i:s',
            'comments' => 'nullable|max:128',
            'caption' => 'required',

            'set' => 'required|array|min:1',

            'set.*.exercise_id' => 'required',
            'set.*.repetitions' => 'required|integer',
            'set.*.weight' => 'required|integer|lte:1000'
        ]);
        // Validate if workout belongs to the user
        $userID = Auth::user()->user_id;
        if(Workout::where('workout_id', $validated)->where('user_id', $userID)->doesntExist()){
            return response()->json([
                'error' => $this->errorMsg
            ], 400);
        }

        // Validate if exercises belong to the user
        foreach ($validated['set'] as $set){
            if(Exercise::where('exercise_id', $set['exercise_id'])->where('user_id', $userID)->doesntExist()){
                return response()->json([
                    'error' => $this->errorMsg
                ], 400);
            }
        };

        $sessionForm = [
            'user_id' => Auth::user()->user_id,
            'workout_id' => $validated['workout_id'],
            'date' => $validated['date'],
            'duration' => $validated['duration'],
            'comments' => $validated['comments'],
            'caption' => $validated['caption']
        ];
        try {
            $session = WorkoutSession::create($sessionForm);

            foreach($validated['set'] as $set){
                WorkoutSet::insert([
                    'session_id' => $session['session_id'],
                    'exercise_id' => $set['exercise_id'],
                    'weight' => $set['weight'],
                    'repetitions' => $set['repetitions'],
                ]);
            }
        } catch (Exception $e) {
            // Remove workout session on failure
            if($session){
                $session->delete();
            }
            return response()->json([
                'error' => $this->errorMsg
            ], 400);
        }

        return response()->json([
            'session' => $session
        ]);

    }

    public function update(Request $request, $id){}

    public function delete($id){
        try {
            WorkoutSession::where('session_id', $id)->where('user_id', Auth::user()->user_id)->delete();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Failed to remove the workout session. Please try again later...'
            ], 400);
        }

        return response()->json([
            'success' => 'Workout session removed successfully.'
        ]);
    }
}
