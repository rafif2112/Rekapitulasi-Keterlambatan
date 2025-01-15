<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json([
            'message' => 'Berhasil menampilkan data user',
            'data' => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required|unique:users',
                'password' => 'required',
                'role' => 'required|in:admin,ps',
            ], [
                'name.required' => 'Nama harus diisi',
                'email.required' => 'Email harus diisi',
                'email.unique' => 'Email sudah terdaftar',
                'password.required' => 'Password harus diisi',
                'role.required' => 'Role harus diisi',
                'role.in' => 'Role harus admin atau ps',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'role' => $request->role,
            ]);
            return response()->json([
                'message' => 'User berhasil ditambahkan',
                'data' => $user
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id){
        $user = User::where('id', $id)->first();
        if ($user) {
            return response()->json([
                'message' => 'Berhasil menampilkan data user',
                'data' => $user
            ]);
        } else {
            return response()->json([
                'message' => 'User tidak ditemukan'
            ], 404);
        }
    }

    public function pembimbing()
    {
        $users = User::where('role', 'ps')->get();
        return response()->json([
            'message' => 'Berhasil menampilkan data pembimbing',
            'data' => $users
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::where('id', $id)->first();
        if ($user) {
            try {
                $request->validate([
                    'name' => 'required',
                    'email' => 'required|unique:users,email,' . $id,
                    'role' => 'required|in:admin,ps',
                ], [
                    'name.required' => 'Nama harus diisi',
                    'email.required' => 'Email harus diisi',
                    'email.unique' => 'Email sudah terdaftar',
                    'role.required' => 'Role harus diisi',
                    'role.in' => 'Role harus admin atau ps',
                ]);

                $user->update([
                    'name' => $request->name,
                    'email' => $request->email,
                    'role' => $request->role,
                ]);
                return response()->json([
                    'message' => 'User berhasil diubah',
                    'data' => $user
                ]);
            } catch (\Illuminate\Validation\ValidationException $e) {
                return response()->json([
                    'message' => 'Validasi gagal',
                    'errors' => $e->errors()
                ], 422);
            }
        } else {
            return response()->json([
                'message' => 'User tidak ditemukan'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::where('id', $id)->first();
        if ($user) {
            $user->delete();
            return response()->json([
                'message' => 'User berhasil dihapus'
            ]);
        } else {
            return response()->json([
                'message' => 'User tidak ditemukan'
            ], 404);
        }
    }
}
