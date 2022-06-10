<?php

namespace App\Http\Requests;


class FamilyRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'name' => 'required|max:20',
            'code' => 'required|max:20',
        ];
    }
}
