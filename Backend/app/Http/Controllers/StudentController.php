<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::with(['rombel', 'rayon'])->get();
        $students->transform(function ($student) {
            $student->rombel_id = $student->rombel->rombel;
            $student->rayon_id = $student->rayon->rayon;
            return $student;
        });
        return response()->json([
            'message' => 'Berhasil menampilkan data siswa',
            'data' => $students
        ]);
    }

    public function indexPs()
    {
        $user = Auth::user();
        $rayonId = $user->rayon->id;
        $students = Student::where('rayon_id', $rayonId)->with(['rombel', 'rayon'])->get();
        $students->transform(function ($student) {
            $student->rombel_name = $student->rombel->rombel;
            $student->rayon_name = $student->rayon->rayon;
            return $student;
        });
        return response()->json([
            'message' => 'Berhasil menampilkan data siswa',
            'data' => $students
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'nama' => 'required',
                'nis' => 'required|unique:students',
                'rombel' => 'required',
                'rayon' => 'required',
            ], [
                'nama.required' => 'Nama harus diisi',
                'nis.required' => 'NIS harus diisi',
                'nis.unique' => 'NIS sudah terdaftar',
                'rombel.required' => 'Rombel harus diisi',
                'rayon.required' => 'Rayon harus diisi',
            ]);

            $student = Student::create([
                'name' => $request->nama,
                'nis' => $request->nis,
                'rombel_id' => $request->rombel,
                'rayon_id' => $request->rayon,
            ]);
            return response()->json([
                'message' => 'Siswa berhasil ditambahkan',
                'data' => $student
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
    public function show(Student $student, $id)
    {
        $student = Student::where('id', $id)->with(['rombel', 'rayon'])->first();
        if ($student) {
            $student->rombel_id = $student->rombel->rombel;
            $student->rayon_id = $student->rayon->rayon;
            return response()->json([
                'message' => 'Berhasil menampilkan data siswa',
                'data' => $student
            ]);
        } else {
            return response()->json([
                'message' => 'Data siswa tidak ditemukan'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $student = Student::where('id', $id);
        if ($student) {
            try {
                $request->validate([
                    'nama' => 'required',
                    'nis' => 'required|unique:students,nis,' . $id,
                    'rombel' => 'required',
                    'rayon' => 'required',
                ], [
                    'nama.required' => 'Nama harus diisi',
                    'nis.required' => 'NIS harus diisi',
                    'nis.unique' => 'NIS sudah terdaftar',
                    'rombel.required' => 'Rombel harus diisi',
                    'rayon.required' => 'Rayon harus diisi',
                ]);

                if (is_string($request->rombel)) {
                    $request->merge(['rombel' => \App\Models\Rombel::where('rombel', $request->rombel)->first()->id]);
                }
                if (is_string($request->rayon)) {
                    $request->merge(['rayon' => \App\Models\Rayon::where('rayon', $request->rayon)->first()->id]);
                }

                $student = Student::where('id', $id);
                $student->update([
                    'name' => $request->nama,
                    'nis' => $request->nis,
                    'rombel_id' => $request->rombel,
                    'rayon_id' => $request->rayon,
                ]);
                return response()->json([
                    'message' => 'Siswa berhasil diubah',
                ]);
            } catch (\Illuminate\Validation\ValidationException $e) {
                return response()->json([
                    'message' => 'Validasi gagal',
                    'errors' => $e->errors()
                ], 422);
            }
        } else {
            return response()->json([
                'message' => 'Siswa tidak ditemukan'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student, $id)
    {
        $student = Student::where('id', $id);
        if ($student) {
            $student->delete();
            return response()->json([
                'message' => 'Siswa berhasil dihapus',
            ]);
        } else {
            return response()->json([
                'message' => 'Siswa tidak ditemukan'
            ], 404);
        }
    }
}
