<?php

namespace App\Http\Requests;


class PointHistoryIndexRequest extends IndexRequest
{
    protected $conditions = [
        'type' => '=',
        'name' => 'like',
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

        if ($this->filled('pointFrom')){
            $query->where('point_histories.point', '>=', $this->pointFrom);
        }

        if ($this->filled('pointTo')){
            $query->where('point_histories.point', '<=', $this->pointTo);
        }

        return $query;
    }
}
