<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;

class InquiryUpdateRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'status' => 'required',
            'note' => 'nullable|max:1500',
        ];
    }
}
