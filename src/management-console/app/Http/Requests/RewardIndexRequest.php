<?php

namespace App\Http\Requests;


class RewardIndexRequest extends IndexRequest
{
    protected $conditions = [
        'name' => 'like',
    ];
}
