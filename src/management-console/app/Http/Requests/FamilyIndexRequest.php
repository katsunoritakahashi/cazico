<?php

namespace App\Http\Requests;


class FamilyIndexRequest extends IndexRequest
{
    protected $conditions = [
        'name' => 'like',
        'code' => 'like',
    ];

    public function searchCondition($query)
    {
        if ($this->filled('userName')){
            $query = $query->whereHas('users', function ($query) {
                $query->where('users.name', 'like',  "%$this->userName%");
            });
        }
        if ($this->filled('userGender')){
            $query = $query->whereHas('users', function ($query) {
                $query->where('users.gender', $this->userGender);
            });
        }

        if ($this->filled('userBirthdayFrom')){
            $query = $query->whereHas('users', function ($query) {
                $query->whereDate('users.birthday', '>=', $this->userBirthdayFrom);
            });
        }

        if ($this->filled('userBirthdayTo')){
            $query = $query->whereHas('users', function ($query) {
                $query->whereDate('users.birthday', '<=', $this->userBirthdayTo);
            });
        }

        if ($this->filled('userEmail')){
            $query = $query->whereHas('users', function ($query) {
                $query->where('users.email', 'like',  "%$this->userEmail%");
            });
        }

        return $query;
    }
}
