<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exports\LateExport;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Late;

class ExportController extends Controller
{
    public function exportAdmin()
    {
        $lates = Late::with(['student', 'student.rayon', 'student.rombel'])->orderBy('date_time_late', 'desc')->get();
        $lates->transform(function ($late) {
            $late->student_name = $late->student->name;
            $late->student_nis = $late->student->nis;
            $late->student_rayon = $late->student->rayon->rayon;
            $late->student_rombel = $late->student->rombel->rombel;
            $late->jumlah_keterlambatan = $late->student->lates->count();
            unset($late->student);
            return $late;
        });
        
        // return response()->json([
        //     'message' => 'Berhasil menampilkan data keterlambatan',
        //     'data' => $lates
        // ]);

        return Excel::download(new LateExport($lates), 'data keterlambatan.xlsx');
    }

    public function exportPembimbing()
    {   
        $user = auth()->user();
        $rayon_id = $user->rayon->id;
        $lates = Late::with(['student', 'student.rayon', 'student.rombel'])
            ->whereHas('student', function ($query) use ($rayon_id) {
                $query->where('rayon_id', $rayon_id);
            })
            ->orderBy('date_time_late', 'desc')->get();
        $lates->transform(function ($late) {
            $late->student_name = $late->student->name;
            $late->student_nis = $late->student->nis;
            $late->student_rayon = $late->student->rayon->rayon;
            $late->student_rombel = $late->student->rombel->rombel;
            $late->jumlah_keterlambatan = $late->student->lates->count();
            unset($late->student);
            return $late;
        });

        // return response()->json([
        //     'message' => 'Berhasil menampilkan data keterlambatan',
        //     'data' => $lates
        // ]);

        return Excel::download(new LateExport($lates), 'data keterlambatan rayon.xlsx');
    }
}
