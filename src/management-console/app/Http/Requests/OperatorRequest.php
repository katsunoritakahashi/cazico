<?php

namespace App\Http\Requests;


use Illuminate\Support\Facades\Hash;

class OperatorRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'name' => 'required|max:20',
            'email' => $this->buildEmailValidationRule(),
            'password' => $this->buildPasswordValidationRule(),
        ];
    }

    public function preProcess()
    {
        $validated = parent::validated();
        $validated['password'] = Hash::make($validated['password']);

        return $validated;
    }

    private function buildPasswordValidationRule () {
        $passwordRule = ['alpha_num', 'min:8', 'max:100'];
        $isCreateRequest = parent::getRealMethod() === 'POST';
        if ($isCreateRequest) {
            array_unshift($passwordRule, 'required');
        }

        return $passwordRule;
    }

    private function buildEmailValidationRule () {
        $passwordRule = ['required','email:rfc'];
        $isCreateRequest = parent::getRealMethod() === 'POST';
        if ($isCreateRequest) {
            array_push($passwordRule, 'unique:operators,email');
        }

        return $passwordRule;
    }
}
