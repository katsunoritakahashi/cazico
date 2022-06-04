<?php

namespace Database\Seeders;

use App\Models\RewardCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RewardCategorySeeder extends Seeder
{
    private $categories = [
        1 => ["奮発します！", 'dinner.jpg', 'https://cazico-public.s3.ap-northeast-1.amazonaws.com/reward_image/dinner.jpg'],
        2 => ["いつもありがとう", 'present.jpg', 'https://cazico-public.s3.ap-northeast-1.amazonaws.com/reward_image/present.jpg'],
        3 => ["ほんの気持ちですが", 'afternoon_tea.jpg', 'https://cazico-public.s3.ap-northeast-1.amazonaws.com/reward_image/afternoon_tea.jpg'],
    ];
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->categories as $index => $category) {
            RewardCategory::updateOrCreate(
                ['id' => $index],
                ['id' => $index, 'name' => $category[0], 'image_name' => $category[1], 'uri' => $category[2]],
            );
        }
    }
}
