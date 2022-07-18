<?php

namespace App\Http\Resources;


class UserResource extends BaseResource
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
            'position' => $this->position->name,
            'birthday' => $this->birthday,
            'email' => $this->email,
            'createdAt' => $this->createdAtToString(),
            'updatedAt' => $this->updatedAtToString(),
        ];
    }
}
