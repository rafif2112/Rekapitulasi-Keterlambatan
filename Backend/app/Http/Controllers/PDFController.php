<?php

namespace App\Http\Controllers;

use PDF;
use App\Models\Late;
use App\Models\Rayon;
use App\Models\User;
use Carbon\Carbon;

class PDFController extends Controller
{
    public function downloadPDF($id)
    {
        $late = Late::with('student')->where('student_id', $id)->get();
        $rayonId = $late->first()->student->rayon->id;
        $rayon = Rayon::where('id', $rayonId)->first();
        $pembimbing = User::where('id', $rayon->user_id)->first();

        // return response()->json([$late->first()->student]);

        $data = [
            'nis' => $late->first()->student->nis,
            'name' => $late->first()->student->name,
            'rombel' => $late->first()->student->rombel->rombel,
            'rayon' => $rayon->rayon,
            'pembimbing' => $pembimbing->name,
            'total_late' => Late::where('student_id', $id)->count(),
            'date' => Carbon::now()->format('d F Y')
        ];

        // return response()->json($data);

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf', $data);
        return $pdf->download('surat-pernyataan.pdf');
    }
}