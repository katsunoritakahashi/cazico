<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;

class InquiryReplyRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'body' => 'required',
        ];
    }
}
