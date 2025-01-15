<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }

    public function dashboard()
    {
        $students = \App\Models\Student::count();
        $admins = \App\Models\User::where('role', 'admin')->count();
        $rombels = \App\Models\Rombel::count();
        $rayons = \App\Models\Rayon::count();
        $pembimbing = \App\Models\User::where('role', 'ps')->count();

        return response()->json([
            'siswa' => $students,
            'admin' => $admins,
            'rombel' => $rombels,
            'rayon' => $rayons,
            'pembimbing' => $pembimbing
        ]);
    }

    public function dashboardPs()
    {
        $user = Auth::user();
        $rayonId = $user->rayon->id;
        $rayonName = $user->rayon->rayon;

        // return response()->json([
        //     'rayon' => $rayonName,
        //     'rayon_id' => $rayonId
        // ]);

        $today = now()->format('Y-m-d');
        $students = \App\Models\Student::where('rayon_id', $rayonId)->count();
        $lateToday = \App\Models\Late::whereHas('student', function($query) use ($rayonId) {
            $query->where('rayon_id', $rayonId);
        })
        ->whereDate('date_time_late', $today)
        ->count();
        
        return response()->json([
            'total_students' => $students,
            'today' => $today,
            'today_late' => $lateToday,
            'rayon' => $rayonName
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->user()) {
            return response()->json([
                'message' => 'User is already logged in',
                'user' => $request->user()
            ], 400);
        }

        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('access_token')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
            ])->cookie('token', $token, 1440, '/', null, true, true);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function show()
    {
        if (Auth::check()) {
            return response()->json([
                'message' => 'User is logged in',
                'user' => Auth::user()
            ]);
        }

        return response()->json([
            'message' => 'User is not logged in'
        ], 401);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update()
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        // logout
        if (Auth::check()) {
            Auth::user()->currentAccessToken()->delete();
            return response()->json(['message' => 'Logged out successfully']);
        }
        return response()->json(['message' => 'Not authenticated'], 401);
    }
}
