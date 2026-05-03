<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@admin',
            'password' => Hash::make('1234'),
            'is_admin' => 'true',
        ]);

        $i = 0;
        while($i < 50){
           User::factory()->create([
                'name' => 'Some Ordinary User',
                'email' => fake()->unique()->safeEmail(),
                'password' => Hash::make('1234'),
            ]); 
            $i++;
        }

    }
}
