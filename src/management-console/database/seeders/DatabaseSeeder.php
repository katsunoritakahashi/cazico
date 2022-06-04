<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(HouseWorkCategorySeeder::class);
        $this->call(RewardCategorySeeder::class);
        $this->call(OperatorSeeder::class);
        $this->call(FamilySeeder::class);
        $this->call(HouseWorkSeeder::class);
        $this->call(RewardSeeder::class);
        $this->call(PointHistorySeeder::class);
        $this->call(InquirySeeder::class);
    }
}
