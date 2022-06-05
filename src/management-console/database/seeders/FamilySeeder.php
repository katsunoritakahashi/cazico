<?php

namespace Database\Seeders;

use App\Models\Family;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FamilySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $takahashiFamily = Family::create([
            'name' => '高橋',
            'code' => 'noeri0414',
        ]);
        User::create([
            'family_id' => $takahashiFamily->id,
            'name' => '克典',
            'gender' => 'man',
            'birthday' => '1994-09-16',
            'email' => 'katsutennis.916@gmail.com',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
            'remember_token' => 'takahashi_katsunori'
        ]);
        User::create([
            'family_id' => $takahashiFamily->id,
            'name' => '絵里香',
            'gender' => 'woman',
            'birthday' => '1992-08-25',
            'email' => 'erika@gmail.com',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
            'remember_token' => 'takahashi_katsunori'
        ]);
        $families = Family::factory(10)->create();
        foreach ($families as $family) {
            User::factory(2)->create([
                'family_id' => $family->id
            ]);
        }
    }
}
