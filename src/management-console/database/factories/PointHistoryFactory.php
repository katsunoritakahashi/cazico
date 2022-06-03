<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PointHistory>
 */
class PointHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $type = $this->faker->randomElement(['house_work','reward']);
        if ($type == 'house_work') {
            $point = $this->faker->numberBetween(1, 5) * 100;
        } else {
            $point = $this->faker->numberBetween(1, 5) * 100 * -1;
        }
        return [
            'user_id' => User::factory(),
            'type' => $type,
            'name' => $this->faker->text(10),
            'point' => $point
        ];
    }
}
