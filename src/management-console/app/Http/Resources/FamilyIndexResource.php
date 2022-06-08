<?php

namespace App\Http\Resources;


class FamilyIndexResource extends BaseResource
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
            'userName' => $this->users()->pluck('users.name'),
            'userGender' => $this->users()->pluck('users.gender'),
            'userBirthday' => $this->users()->pluck('users.birthday'),
            'userEmail' => $this->users()->pluck('users.email'),
            'createdAt' => $this->createdAtToString()
        ];
    }
}
