<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function view(){
        $users = User::where('is_admin', false)->orderBy('user_id', 'asc')->paginate(10);
        $exercises = Exercise::where('is_public', true)->orderBy('exercise_id', 'asc')->paginate(10);
        
        return view('admin', compact('users', 'exercises'));
    }

    public function searchUser(Request $request){
        $exercises = Exercise::where('is_public', true)->orderBy('exercise_id', 'asc')->paginate(10);
        $users = User::where('is_admin', false)
        ->where(function($q) use($request){
            $q->where('user_id', 'like', '%'.$request['query'].'%')
            ->orWhere('name', 'like', '%'.$request['query'].'%')
            ->orWhere('email', 'like', '%'.$request['query'].'%');
        })
        ->orderBy('user_id', 'asc')
        ->paginate(10);

        return view('admin', compact('exercises', 'users'));
    }

    public function deleteUser(Request $request, $id){
        try {
            User::where('user_id', $id)->where('is_admin', false)->firstOrFail()->delete();
            return redirect()->back()->with('success', "User was deleted");
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', "An error was encountered, please try again later.");
        }
        
    }

    public function searchExercise(Request $request){
        $exercises = Exercise::where('is_public', true)
        ->where('exercise_id', 'like', '%'.$request['query'].'%')
        ->orWhere('name', 'like', '%'.$request['query'].'%')
        ->orderBy('exercise_id', 'asc')->paginate(10);
        $users = User::where('is_admin', false)->orderBy('user_id', 'asc')->paginate(10);

        return view('admin', compact('exercises', 'users'));
    }

    public function createExercise(Request $request){
        $validated = $request->validate([
            'name' => 'required|max:128',
            'description' => 'nullable|max:128',
        ]);

        $validated['is_public'] = true;
        $validated['user_id'] = Auth::user()->user_id;
        try {
            Exercise::insert([
                'user_id' => Auth::user()->user_id,
                'name' => $validated['name'],
                'description' => $validated['description'],
                'is_public' => true,
            ]);
            return redirect()->route('admin');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Failed to create the exercise.');
        }
    }

    public function deleteExercise(Request $request, $id){
        try {
            Exercise::where('exercise_id', $id)->where('is_public', true)->firstOrFail()->delete();
            return redirect()->back()->with('success', "Exercise was deleted");
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', "An error was encountered, please try again later.");
        }
    }
}
