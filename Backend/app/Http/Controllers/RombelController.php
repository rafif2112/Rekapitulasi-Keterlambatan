<?php

namespace App\Http\Controllers;

use App\Models\Rombel;
use Illuminate\Http\Request;

class RombelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rombels = Rombel::orderBy('rombel', 'ASC')->get();
        return response()->json([
            'message' => 'Berhasil menampilkan data rombel',
            'data' => $rombels
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'rombel' => 'required|unique:rombels',
            ], [
                'rombel.required' => 'Rombel harus diisi',
                'rombel.unique' => 'Rombel sudah terdaftar',
            ]);

            $rombel = Rombel::create($request->all());
            return response()->json([
                'message' => 'Rombel berhasil ditambahkan',
                'data' => $rombel
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Rombel $rombel, $id)
    {
        $rombel = Rombel::where('id', $id)->first();
        if($rombel){
            return response()->json([
                'message' => 'Berhasil menampilkan data rombel',
                'data' => $rombel
            ]);
        }else{
            return response()->json([
                'message' => 'Data rombel tidak ditemukan'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Rombel $rombel, $id)
    {
        $request->validate([
            'rombel' => 'required|unique:rombels',
        ],[
            'rombel.required' => 'Rombel harus diisi',
            'rombel.unique' => 'Rombel sudah terdaftar',
        ]);

        $rombel = Rombel::where('id', $id)->update($request->all());
        if($rombel){
            return response()->json([
                'message' => 'Rombel berhasil diubah',
            ]);
        }else{
            return response()->json([
                'message' => 'Rombel tidak ditemukan'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rombel $rombel, $id)
    {
        $rombel = Rombel::where('id', $id)->delete();
        if($rombel){
            return response()->json([
                'message' => 'Rombel berhasil dihapus',
            ]);
        }else{
            return response()->json([
                'message' => 'Rombel tidak ditemukan'
            ], 404);
        }
    }
}
