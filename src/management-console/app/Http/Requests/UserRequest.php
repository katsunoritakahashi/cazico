<?php

namespace App\Http\Requests;


class UserRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'name' => 'required|max:20',
            'gender' => 'required|max:20',
            'birthday' => 'required|date',
            'email' => 'required|email',
        ];
    }
}
