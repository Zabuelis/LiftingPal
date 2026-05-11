<?php

namespace App\Http\Controllers;
use App\Models\Weight;
use App\Models\WorkoutSession;
use App\Models\WorkoutSet;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use Illuminate\Http\Request;

class UserController extends Controller
{

    private $precision = 1;
    // Return authenticated user information
    public function show(){
        $user = Auth::user();

        return response([
            'user' => $user
        ]);
    }

    public function updateBodyStats(Request $request){

        if(!is_numeric($request['weight']) || !is_numeric($request['height'])){
            return response()->json([
                'error' => 'There was an error processing your request. Make sure the data is numerical.'
            ], 403);
        }
        $request['weight'] = round($request['weight'], $this->precision);
        $request['height'] = round($request['height'], $this->precision);

        $validated = $request->validate([
            'weight' => 'required|decimal:0,1|lte:1000',
            'height' => 'required|decimal:0,1|lte:1000',
            'date' => 'required|date'
        ]);

        try {
            User::where('user_id', Auth::user()->user_id)
            ->update([
                'weight' => $validated['weight'],
                'height' => $validated['height'],
            ]);
            Weight::insert([
                'user_id' => Auth::user()->user_id,
                'date' => $validated['date'],
                'weight' => $validated['weight']
            ]);
            return response()->json([
                'success' => 'Data updated successfully.'
            ]);
        } catch (Exception $e) {
            Log::error("Body statistics update failed", [
                'message' => $e
            ]);
            return response()->json([
                'error' => 'Failed to update the parameters.'
            ], 403);
        }

    }

    public function userTotals(Request $request) {
        try {
            $total_workouts = WorkoutSession::where('user_id', Auth::user()->user_id)->count();

            $total_sets =  WorkoutSet::join('workout_session', 'workout_session.session_id', '=', 'workout_set.session_id')
            ->where('user_id', Auth::user()->user_id)
            ->count();

            $total_time = WorkoutSession::select(DB::raw('sum(extract (epoch from duration)) as total_time'))
            ->where('user_id', Auth::user()->user_id)
            ->pluck('total_time')
            ->first();
            $total_hours = number_format($total_time / 3600, 1);
            return response()->json([
                'total_workouts' => $total_workouts,
                'total_sets' => $total_sets,
                'total_time' => $total_hours
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch user totals.'
            ], 403);
        }
    }

    public function weekTimeDifference(){
        try {
            $week_time = WorkoutSession::select(DB::raw("date_trunc('week', date) as week, sum(extract(epoch from duration)) as time"))
            ->whereRaw("date >= date_trunc('week', NOW() - INTERVAL '1 week')")
            ->where('user_id', Auth::user()->user_id)
            ->groupBy('week')
            ->orderBy('week', 'asc')
            ->get();
            return response()->json([
                'week_time' => $week_time
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch week time difference.'
            ], 403);
        }
    }

    public function weeklyTimeDifferece(){
        try {
            $week_time = WorkoutSession::select(DB::raw("date_trunc('week', date) as week, sum(extract(epoch from duration)) as time"))
            ->whereRaw("date >= date_trunc('week', NOW() - INTERVAL '1 week')")
            ->where('user_id', Auth::user()->user_id)
            ->groupBy('week')
            ->orderBy('week', 'asc')
            ->get();

            $daily_time = DB::select("
                SELECT 
                    COALESCE(sum(extract(epoch from workout_session.duration)), 0) as time
                FROM generate_series(
                    date_trunc('week', NOW() - INTERVAL '1 week'),
                    date_trunc('week', NOW() + INTERVAL '1 week') - INTERVAL '1 day',
                    '1 day'::interval
                ) as days(day)
                LEFT JOIN workout_session
                    on date_trunc('day', workout_session.date) = days.day
                    AND workout_session.user_id = ?
                GROUP BY days.day
                ORDER BY days.day
            ", [Auth::user()->user_id]);

            return response()->json([
                'week_time' => $week_time,
                'daily_time' => $daily_time
            ]);

        } catch (Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch week time difference.'
            ], 403);
        }
    }

    public function weeklyVolume(){
        try {
            $volume = DB::select("
                SELECT 
                    weeks.week,
                    COALESCE(sum(workout_set.repetitions * workout_set.weight), 0) as volume
                FROM generate_series(
                    date_trunc('week', NOW() - INTERVAL '3 weeks'),
                    date_trunc('week', NOW()),
                    '1 week'::interval
                ) as weeks(week)
                LEFT JOIN workout_session
                    on date_trunc('week', workout_session.date) = weeks.week
                    and workout_session.user_id = ?
                LEFT JOIN workout_set on workout_session.session_id = workout_set.session_id
                GROUP BY weeks.week
                ORDER BY weeks.week
            ", [Auth::user()->user_id]);

            return response()->json([
                'weekly_volume' => $volume
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch week time difference.'
            ], 403);
        }
    }

    public function weightDifference(){
        try {
            $weight = Weight::select(DB::raw("date_trunc('day', date) as day, ROUND(AVG(weight)::numeric, 1) as weight"))
            ->where('user_id', Auth::user()->user_id)
            ->groupBy('day')
            ->orderBy('day', 'desc')
            ->limit(14)
            ->get()
            ->sortBy('day')
            ->pluck('weight');
            
            return response()->json([
                'weight' => $weight
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch weight difference.'
            ], 403);
        }
    }
}


