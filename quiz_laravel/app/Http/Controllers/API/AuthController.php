<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:user,creator'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $user = User::create([
            'name'=> $request->name,
            'email'=> $request->email,
            'role' => $request->role,
            'password'=> Hash::make($request->password)
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        //return response()->json(['data'=> $user, 'access_token'=> $token, 'token_type'=> 'Bearer']);
        return response()->json(['token' => $token]);
    }

    public function login(Request $request)
    {
        if(!Auth::attempt($request->only('email','password'))){
            return response()->json(['message'=> 'User is unauthorized!'], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        //return response()->json(['data'=> $user, 'access_token'=> $token, 'token_type'=> 'Bearer']);
        return response()->json(['token' => $token]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        if ($user->tokens()->count() == 0) {
            return response()->json(['message' => 'You are already logged out.']);
        }
        $request->user()->tokens()->delete();
        return response()->json(['message'=> 'Successfully logged out!']);
    }
}