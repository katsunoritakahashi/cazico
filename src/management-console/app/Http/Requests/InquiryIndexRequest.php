<?php

namespace App\Http\Requests;


class InquiryIndexRequest extends IndexRequest
{
    protected $conditions = [
        'title' => 'like',
        'body' => 'like',
        'status' => '=',
    ];

    public function searchCondition($query)
    {
        if ($this->filled('familyName')){
            $query = $query->whereHas('user', function ($query) {
                $query->whereHas('family', function ($query) {
                    $query->where('families.name', 'like',  "%$this->familyName%");
                });
            });
        }

        if ($this->filled('userName')){
            $query = $query->whereHas('user', function ($query) {
                $query->where('users.name', 'like',  "%$this->userName%");
            });
        }

        return $query;
    }
}
