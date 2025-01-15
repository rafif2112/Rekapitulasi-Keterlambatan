<?php

namespace App\Http\Controllers;

use App\Models\Late;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class LateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lates = Late::with('student')->orderBy('date_time_late', 'desc')->get();
        $lates->transform(function ($late) {
            $late->student_id = $late->student->name;
            unset($late->student);
            return $late;
        });
        return response()->json([
            'message' => 'Berhasil menampilkan data keterlambatan',
            'data' => $lates
        ]);
    }

    public function indexPs()
    {
        $user = auth()->user();
        $rayon_id = $user->rayon->id;
        $lates = Late::with('student')
            ->whereHas('student', function ($query) use ($rayon_id) {
                $query->where('rayon_id', $rayon_id);
            })
            ->orderBy('date_time_late', 'desc')
            ->get();
        $lates->transform(function ($late) {
            $late->student_id = $late->student->name;
            unset($late->student);
            return $late;
        });

        return response()->json([
            'message' => 'Berhasil menampilkan data keterlambatan',
            'data' => $lates
        ]);
    }

    public function student()
    {
        $lates = Late::with('student')->orderBy('date_time_late', 'desc')->get();
        $lates->transform(function ($late) {
            $late->student_name = $late->student->name;
            $late->student_nis = $late->student->nis;
            $late->jumlah_keterlambatan = $late->student->lates->count();
            unset($late->student);
            return $late;
        });

        return response()->json([
            'message' => 'Berhasil menampilkan data keterlambatan',
            'data' => $lates,
        ]);
    }

    public function studentPs()
    {
        $user = auth()->user();
        $rayon_id = $user->rayon->id;
        $lates = Late::with('student')
            ->whereHas('student', function ($query) use ($rayon_id) {
                $query->where('rayon_id', $rayon_id);
            })
            ->orderBy('date_time_late', 'desc')->get();
        $lates->transform(function ($late) {
            $late->student_name = $late->student->name;
            $late->student_nis = $late->student->nis;
            $late->jumlah_keterlambatan = $late->student->lates->count();
            unset($late->student);
            return $late;
        });

        return response()->json([
            'message' => 'Berhasil menampilkan data keterlambatan',
            'data' => $lates,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Late $late, $id)
    {
        $lates = Late::where('student_id', $id)
            ->with(['student', 'student.rombel', 'student.rayon'])
            ->orderBy('date_time_late', 'desc')->get();

        if ($lates->count() > 0) {
            $formattedLates = $lates->map(function ($late) {
                return [
                    'id' => $late->id,
                    'date_time' => $late->date_time_late,
                    'information' => $late->information,
                    'bukti' => $late->bukti,
                    'student_name' => $late->student->name,
                    'student_nis' => $late->student->nis,
                    'student_rombel' => $late->student->rombel->rombel,
                    'student_rayon' => $late->student->rayon->rayon
                ];
            });

            return response()->json([
                'message' => 'Berhasil menampilkan data keterlambatan',
                'data' => $formattedLates
            ]);
        }

        return response()->json([
            'message' => 'Keterlambatan tidak ditemukan'
        ], 404);
    }

    public function showPs() {
        $user = auth()->user();
        $rayon_id = $user->rayon->id;
        $lates = Late::whereHas('student', function ($query) use ($rayon_id) {
            $query->where('rayon_id', $rayon_id);
        })->orderBy('date_time_late', 'desc')->get();

        if ($lates->count() > 0) {
            $formattedLates = $lates->map(function ($late) {
                return [
                    'id' => $late->id,
                    'date_time' => $late->date_time_late,
                    'information' => $late->information,
                    'bukti' => $late->bukti,
                    'student_name' => $late->student->name,
                    'student_nis' => $late->student->nis,
                    'student_rombel' => $late->student->rombel->rombel,
                    'student_rayon' => $late->student->rayon->rayon
                ];
            });

            return response()->json([
                'message' => 'Berhasil menampilkan data keterlambatan',
                'data' => $formattedLates
            ]);
        }

        return response()->json([
            'message' => 'Keterlambatan tidak ditemukan'
        ], 404);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'siswa' => 'required',
                'date' => 'required',
                'keterangan' => 'required',
                'bukti' => 'required',
            ], [
                'siswa.required' => 'Siswa harus diisi',
                'date.required' => 'Tanggal harus diisi',
                'keterangan.required' => 'Keterangan harus diisi',
                'bukti.required' => 'Bukti harus diisi',
            ]);

            $filename = null;
            if ($request->hasFile('bukti')) {
                $file = $request->file('bukti');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('asset/bukti'), $filename);
            }

            $late = Late::create([
                'student_id' => $request->siswa,
                'date_time_late' => $request->date,
                'information' => $request->keterangan,
                'bukti' => $filename,
            ]);

            return response()->json([
                'message' => 'Keterlambatan berhasil ditambahkan',
                'data' => $late
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        }
    }

    public function detail(Late $late, $id)
    {
        $late = Late::where('id', $id)
            ->with(['student', 'student.rombel', 'student.rayon'])
            ->first();

        if ($late) {
            return response()->json([
                'message' => 'Berhasil menampilkan detail keterlambatan',
                'data' => $late
            ]);
        }

        return response()->json([
            'message' => 'Keterlambatan tidak ditemukan'
        ], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'siswa' => 'required',
                'date' => 'required',
                'keterangan' => 'required',
                'bukti' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            ],[
                'siswa.required' => 'Siswa harus diisi',
                'date.required' => 'Tanggal harus diisi',
                'keterangan.required' => 'Keterangan harus diisi',
                'bukti.image' => 'Bukti harus berupa gambar',
                'bukti.mimes' => 'Bukti harus berformat jpeg, png, jpg',
                'bukti.max' => 'Bukti maksimal berukuran 2MB',
            ]);
            $late = Late::where('id', $id)->first();

            // Handle file upload
            $buktiPath = $late->bukti;
            if ($request->hasFile('bukti')) {
                // Only delete old file if a new file is being uploaded
                if ($late->bukti) {
                    $oldPath = public_path('asset/bukti/' . $late->bukti);
                    if (File::exists($oldPath)) {
                        File::delete($oldPath);
                    }
                }

                $file = $request->file('bukti');
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('asset/bukti'), $filename);
                $buktiPath = $filename;
            }

            $late->update([
                'student_id' => $request->siswa,
                'date_time_late' => $request->date,
                'information' => $request->keterangan,
                'bukti' => $buktiPath,
            ]);

            return response()->json([
                'message' => 'Keterlambatan berhasil diubah',
                'data' => $late
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Late $late, $id)
    {
        $late = Late::where('id', $id)->first();
        if ($late) {
            $late->delete();
            return response()->json([
                'message' => 'Keterlambatan berhasil dihapus'
            ]);
        } else {
            return response()->json([
                'message' => 'Keterlambatan tidak ditemukan'
            ], 404);
        }
    }
}
