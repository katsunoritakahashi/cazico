<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reward extends Model
{
    use HasFactory;

    public function rewardCategory()
    {
        return $this->belongsTo('App\Models\RewardCategory', 'reward_category_id', 'id');
    }
}
