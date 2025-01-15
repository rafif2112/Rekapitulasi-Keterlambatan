<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $table = 'students';
    protected $fillable = ['nis', 'name', 'rayon_id', 'rombel_id'];

    public function rayon()
    {
        return $this->belongsTo(Rayon::class);
    }
    
    public function rombel()
    {
        return $this->belongsTo(Rombel::class);
    }

    public function lates()
    {
        return $this->hasMany(Late::class);
    }
}
