<?php

namespace Database\Seeders;

use App\Models\Reward;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RewardSeeder extends Seeder
{
    private $topics = [
            [1, "あなたの好きなもの", 50000, "あなたが今欲しいものを何でもプレゼントします！"],
            [2, "Amazonギフト500円", 7000, "Amazonギフトだけじゃなくてもスタバカードとかでも大丈夫です！"],
            [3, "お菓子・スイーツ", 300, "コンビニのお菓子を買ってきます！"],
    ];
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();
        foreach ($users as $user) {
            foreach ($this->topics as $topic) {
                Reward::updateOrCreate(
                    ['reward_category_id' => $topic[0], 'user_id' => $user->id, 'name' => $topic[1], 'point' => $topic[2], 'note' => $topic[3]],
                );
            }
        }
    }
}
