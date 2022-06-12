<?php

namespace App\Http\Requests;


class OperatorIndexRequest extends IndexRequest
{
    protected $conditions = [
        'name' => 'like',
        'email' => 'like',
    ];
}
