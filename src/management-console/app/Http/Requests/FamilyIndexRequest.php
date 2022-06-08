<?php

namespace App\Http\Requests;


class FamilyIndexRequest extends IndexRequest
{
    protected $conditions = [
        'name' => 'like',
        'code' => 'like',
    ];
}
