<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Position;

class PositionSeeder extends Seeder
{
    private $positions = [
        '旦那さん',
        '奥さん',
        '息子さん',
        '娘さん',
        'おじいちゃん',
        'おばあちゃん',
        'おじさん',
        'おばさん',
        '彼氏さん',
        '彼女さん'
    ];
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->positions as $position) {
            Position::Create(
                ['name' => $position],
            );
        }
    }
}
