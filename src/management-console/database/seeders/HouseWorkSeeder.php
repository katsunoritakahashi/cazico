<?php

namespace Database\Seeders;

use App\Models\Family;
use App\Models\HouseWork;
use App\Models\HouseWorkCategory;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HouseWorkSeeder extends Seeder
{
    private $topics = [
            [1, "朝ごはん", 65],
            [1, "昼ごはん", 50],
            [1, "晩ごはん", 90],
            [1, "皿洗い", 70],
            [2, "買い物（小）", 50],
            [2, "買い物（大）", 100],
            [3, "洗濯（干し作業）", 90],
            [3, "取り込み", 75],
            [4, "部屋", 50],
            [4, "風呂", 60],
            [4, "トイレ", 60],
            [5, "お迎え", 100],
            [6, "授乳", 100],
            [6, "おむつ替え", 75],
            [6, "沐浴・風呂入れ", 85],
            [6, "夜泣き対応", 100],
            [6, "グズったときの対応", 50],
            [7, "ゴミ出し", 60],
            [8, "その他家事", 50],
            [9, "その他育児", 50],
    ];
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $families = Family::all();
        foreach ($families as $family) {
            foreach ($this->topics as $topic) {
                HouseWork::updateOrCreate(
                    ['house_work_category_id' => $topic[0], 'family_id' => $family->id, 'name' => $topic[1], 'point' => $topic[2]],
                );
            }
        }
    }
}
