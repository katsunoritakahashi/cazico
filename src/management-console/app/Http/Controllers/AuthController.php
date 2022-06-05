<?php

namespace App\Http\Controllers;

use App\Http\Requests\OperatorLoginRequest;
use App\Http\Resources\LoginTokenResource;
use App\Models\LoginToken;
use App\Models\Operator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Get a JWT via given credentials.
     *
     * @param OperatorLoginRequest $request
     */
    public function login(OperatorLoginRequest $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $token = $request->user()->createToken('token-name')->plainTextToken;
            return new LoginTokenResource(new LoginToken($token));
        }

        return response()->json([
            'statusCode' => 401,
            'errorMessage' => 'Unauthorized'
        ], 401);
    }
}
