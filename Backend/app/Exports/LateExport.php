<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class LateExport implements FromCollection, WithHeadings, WithMapping
{
    protected $lates;

    public function __construct($lates)
    {
        $this->lates = $lates;
    }
    
    public function collection()
    {
        return $this->lates;
    }
    
    public function headings(): array
    {
        return [
            'Nama',
            'NIS',
            'Rombel',
            'Rayon',
            'Jumlah Keterlambatan',
        ];
    }

    public function map($late): array
    {
        return [
            $late->student_name,
            $late->student_nis,
            $late->student_rombel,
            $late->student_rayon,
            $late->jumlah_keterlambatan,
        ];
    }
}
