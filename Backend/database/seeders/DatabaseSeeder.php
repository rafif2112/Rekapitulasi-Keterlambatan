<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        User::create([
            'name' => 'Administrator',
            'email' => 'admin@tes',
            'role' => 'admin',
            'password' => bcrypt('admin'),
        ]);

        User::create([
            'name' => 'Pembimbing siswa 1',
            'email' => 'ps1@tes',
            'role' => 'ps',
            'password' => bcrypt('123123'),
        ]);

        User::create([
            'name' => 'Pembimbing siswa 2',
            'email' => 'ps2@tes',
            'role' => 'ps',
            'password' => bcrypt('123123'),
        ]);

        User::create([
            'name' => 'Pembimbing siswa 3',
            'email' => 'ps3@tes',
            'role' => 'ps',
            'password' => bcrypt('123123'),
        ]);

        User::create([
            'name' => 'Pembimbing siswa 4',
            'email' => 'ps4@tes',
            'role' => 'ps',
            'password' => bcrypt('123123'),
        ]);

        User::create([
            'name' => 'Pembimbing siswa 5',
            'email' => 'ps5@tes',
            'role' => 'ps',
            'password' => bcrypt('123123'),
        ]);
    }
}
