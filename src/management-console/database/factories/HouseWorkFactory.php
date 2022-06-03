<?php

namespace Database\Factories;

use App\Models\Family;
use App\Models\HouseWorkCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HouseWork>
 */
class HouseWorkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'family_id' => Family::factory(),
            'house_work_category_id' => HouseWorkCategory::factory(),
            'name' => $this->faker->text(10),
            'point' => $this->faker->numberBetween(1, 50) * 100
        ];
    }
}
