<?php

namespace App\Http\Resources;


class RewardIndexResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'rewardCategory' => $this->rewardCategory->name,
            'name' => $this->name,
            'point' => $this->point,
            'createdAt' => $this->createdAtToString(),
            'updatedAt' => $this->updatedAtToString(),
        ];
    }
}
