<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HouseWork extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'point',
    ];

    public function houseWorkCategory()
    {
        return $this->belongsTo('App\Models\HouseWorkCategory', 'house_work_category_id', 'id');
    }
}
