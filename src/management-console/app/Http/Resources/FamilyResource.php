<?php

namespace App\Http\Resources;


class FamilyResource extends BaseResource
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
            'name' => $this->name,
            'code' => $this->code,
            'createdAt' => $this->createdAtToString(),
            'updatedAt' => $this->updatedAtToString(),
        ];
    }
}
