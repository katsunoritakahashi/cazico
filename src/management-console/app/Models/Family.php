<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Family extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
    ];
    public function houseWorks()
    {
        return $this->hasMany('App\Models\HouseWork', 'family_id');
    }

    public function users()
    {
        return $this->hasMany('App\Models\User', 'family_id');
    }
}
