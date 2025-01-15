<?php

namespace App\Http\Controllers;

use App\Models\Rayon;
use Illuminate\Http\Request;
use App\Models\User;

class RayonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rayons = Rayon::with('user')->get();
        $rayons->transform(function ($rayon) {
            $rayon->user_id = $rayon->user->name;
            unset($rayon->user);
            return $rayon;
        });
        return response()->json([
            'message' => 'Berhasil menampilkan data rayon',
            'data' => $rayons
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'rayon' => 'required|unique:rayons',
            'pembimbing' => 'required|unique:rayons,user_id',
        ],[
            'rayon.required' => 'Rayon harus diisi',
            'rayon.unique' => 'Rayon sudah terdaftar',
            'pembimbing.required' => 'Pembimbing harus diisi',
            'pembimbing.unique' => 'Pembimbing sudah terdaftar',
        ]);

        $pembimbing = User::where('id', $request->pembimbing)->first();

        if($pembimbing){
            $rayon = Rayon::create([
                'rayon' => $request->rayon,
                'user_id' => $request->pembimbing
            ]);
            return response()->json([
                'message' => 'Rayon berhasil ditambahkan',
                'data' => $rayon
            ]);
        }else{
            return response()->json([
                'message' => 'Pembimbing tidak ditemukan'
            ], 404);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Rayon $rayon, $id){
        $rayon = Rayon::where('id', $id)->first();
        if($rayon){
            return response()->json([
                'message' => 'Berhasil menampilkan data rayon',
                'data' => $rayon
            ]);
        }else{
            return response()->json([
                'message' => 'Data rayon tidak ditemukan'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Rayon $rayon, $id)
    {
        $request->validate([
            'rayon' => 'required|unique:rayons,rayon,'. $id,
            'pembimbing' => 'required|unique:rayons,user_id,'. $id,
        ],[
            'rayon.required' => 'Rayon harus diisi',
            'rayon.unique' => 'Rayon sudah terdaftar',
            'pembimbing.required' => 'Pembimbing harus diisi',
            'pembimbing.unique' => 'Pembimbing sudah terdaftar',
        ]);

        $pembimbing = User::where('id', $request->pembimbing)->first();

        if($pembimbing){
            $rayon = Rayon::where('id', $id)->first();
            if($rayon){
                $rayon->update([
                    'rayon' => $request->rayon,
                    'user_id' => $request->pembimbing
                ]);
                return response()->json([
                    'message' => 'Rayon berhasil diupdate',
                    'data' => $rayon
                ]);
            }else{
                return response()->json([
                    'message' => 'Data rayon tidak ditemukan'
                ], 404);
            }
        }else{
            return response()->json([
                'message' => 'Pembimbing tidak ditemukan'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rayon $rayon, $id)
    {
        $rayon = Rayon::where('id', $id)->first();
        if($rayon){
            $rayon->delete();
            return response()->json([
                'message' => 'Rayon berhasil dihapus'
            ]);
        }else{
            return response()->json([
                'message' => 'Data rayon tidak ditemukan'
            ], 404);
        }
    }
}
