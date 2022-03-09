<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){

        $data = $request->validate([
            'name'=>'required|string|max:255',
            'email'=>'required|email|max:255|unique:users,email',
            'password'=>'required|min:6|max:255|confirmed',
        ]);

        $user = User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>bcrypt($data['password'])
        ]);

        $token = $user->createToken('lvvueauth')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(Request $request){

        $data = $request->validate([
            'email'=>'required|email|exists:users,email',
            'password'=>'required'
        ]);

        $user = User::where('email', $data['email'])->first();

        if(!$user || !Hash::check($data['password'], $user->password)){
            return response([
                'errors'=>['Bad Creads']
            ], 422);
        }

        $token = $user->createToken('lvvueapp')->plainTextToken;

        return response([
            'user'=>$user,
            'token'=>$token
        ]);
    }

    public function logout(){

        auth()->user()->currentAccessToken()->delete(); 
        
        return response([
            'success'=>true
        ]);
    }
}
