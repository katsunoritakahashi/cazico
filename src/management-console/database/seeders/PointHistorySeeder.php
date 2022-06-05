<?php

namespace Database\Seeders;

use App\Models\PointHistory;
use App\Models\Reward;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Provider\DateTime;

class PointHistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();
        foreach ($users as $user) {
            for ($count = 0; $count < 20; $count++) {
                $houseWork = $user->family->houseWorks()->inRandomOrder()->first();
                PointHistory::factory()->create([
                    'user_id' => $user->id,
                    'type' => 'house_work',
                    'name' => $houseWork->name,
                    'point' => $houseWork->point,
                    'created_at' => DateTime::dateTimeThisMonth(),
                ]);
            }
            PointHistory::factory()->create([
                'user_id' => $user->id,
                'type' => 'reward',
                'name' => 'お菓子・スイーツ',
                'point' => 300 * -1,
                'created_at' => Carbon::yesterday(),
            ]);
        }
    }
}
