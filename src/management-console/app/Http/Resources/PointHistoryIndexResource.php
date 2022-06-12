<?php

namespace App\Http\Resources;


class PointHistoryIndexResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        if ($this->type == 'house_work') $type = '家事';
        if ($this->type == 'reward') $type = 'ねぎらい';

        return [
            'id' => $this->id,
            'familyName' => $this->user->family->name,
            'userName' => $this->user->name,
            'type' => $type,
            'name' => $this->name,
            'point' => $this->point,
            'createdAt' => $this->createdAtToString()
        ];
    }
}
