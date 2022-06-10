<?php

namespace App\Http\Requests;


class HouseWorkIndexRequest extends IndexRequest
{
    protected $conditions = [
        'name' => 'like',
        'code' => 'like',
    ];
}
