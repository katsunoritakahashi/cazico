<?php

namespace Database\Seeders;

use App\Models\Family;
use App\Models\HouseWorkCategory;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HouseWorkCategorySeeder extends Seeder
{
    private $categories = [
        1 => ["料理", '1_cooking.png', 'https://cazico-public.s3.ap-northeast-1.amazonaws.com/housework_image/1_cooking.png'],
        2 => ["買い物", '2_shopping.png', 'https://cazico-public.s3.ap-northeast-1.amazonaws.com/housework_image/2_shopping.png'],
        3 => ["洗濯", '3_washing.png', 'https://cazico-public.s3.ap-northeast-1.amazonaws.com/housework_image/3_washing.png'],
        4 => ["掃除", '4_cleaning.png', 'https://cazico-public.s3.ap-northeast-1.amazonaws.com/housework_image/4_cleaning.png'],
        5 => ["お迎え", '5_pick_up.png', 'https://cazico-public.s3.ap-northeast-1.amazonaws.com/housework_image/5_pick_up.png'],
        6 => ["子守", '6_child_guard.png', 'https://cazico-public.s3.ap-northeast-1.amazonaws.com/housework_image/6_child_guard.png'],
        7 => ["ゴミ出し", '7_garbage.png', 'https://cazico-public.s3.ap-northeast-1.amazonaws.com/housework_image/7_garbage.png'],
        8 => ["その他家事", '8_other_house_work.png', 'https://cazico-public.s3.ap-northeast-1.amazonaws.com/housework_image/8_other_house_work.png'],
        9 => ["その他育児", '9_other_childcare.png', 'https://cazico-public.s3.ap-northeast-1.amazonaws.com/housework_image/9_other_childcare.png'],
    ];
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->categories as $index => $category) {
            HouseWorkCategory::updateOrCreate(
                ['id' => $index],
                ['id' => $index, 'name' => $category[0], 'image_name' => $category[1], 'uri' => $category[2]],
            );
        }
    }
}
