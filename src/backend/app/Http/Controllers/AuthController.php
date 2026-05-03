<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    private $precision = 1;
    public function register(Request $request){
        // Round up to set precision
        if($request['weight'] && is_numeric($request['weight'])){
            $request['weight'] = round($request['weight'], $this->precision);
        }
        if($request['height'] && is_numeric($request['height'])){
            $request['height'] = round($request['height'], $this->precision);
        }

        $validated = $request->validate([
            'name' => 'required|max:255',
            'password' =>  'required|min:8|confirmed',
            'email' => 'required|email|unique:user',
            'weight' => 'nullable|gt:0|decimal:0,1',
            'height' => 'nullable|gt:0|decimal:0,1',
        ]);

        $user = User::create($validated);

        $token = $user->createToken($request->name);

        return response([
            'user' => $user,
            'token' => $token->plainTextToken
        ]);
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' =>  'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)){
            return response([
                'error'=>'Incorrect credentials'
            ], 403);
        }

        $token = $user->createToken($user->name);

        return response([
            'user' => $user,
            'token' => $token->plainTextToken
        ]);

    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();

        return response([
            'success' => 'You have logged out.'
        ]);
    }

    public function loginAdmin(Request $request){
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $validated['email'])->first();

        if(!$user || !Hash::check($validated['password'], $user->password)){
            return redirect()->back()->with('error', 'Incorrect credentials.');
        }

        if(Auth::attempt($validated)){
            if(!$user->is_admin){
                Auth::logout();
                return redirect()->back()->with('error', 'This is dedicated for admin users. For full experience use the application.');
            }
            $request->session()->regenerate();
            return redirect()->route('admin');
        }
        return redirect()->back()->with('error', 'Incorrect credentials.');
    }

    public function logoutAdmin(Request $request){
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
