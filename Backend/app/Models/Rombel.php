<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rombel extends Model
{
    use HasFactory;

    protected $table = 'rombels';
    protected $fillable = ['rombel'];

    public function students()
    {
        return $this->hasMany(Student::class);
    }
}