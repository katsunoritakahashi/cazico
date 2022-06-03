<?php

namespace Database\Factories;

use App\Models\RewardCategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reward>
 */
class RewardFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'reward_category_id' => RewardCategory::factory(),
            'name' => $this->faker->text(10),
            'point' => $this->faker->numberBetween(1, 50) * 100
        ];
    }
}
