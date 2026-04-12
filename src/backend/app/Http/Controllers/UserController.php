<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

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
            'height' => 'required|decimal:0,1|lte:1000'
        ]);

        try {
            User::where('user_id', Auth::user()->user_id)
            ->update([
                'weight' => $validated['weight'],
                'height' => $validated['height'],
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
}


