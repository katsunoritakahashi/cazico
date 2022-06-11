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
        if ($this->gender == 'man') $gender = '男性';
        if ($this->gender == 'woman') $gender = '女性';
        if ($this->gender == 'other') $gender = 'その他';

        return [
            'id' => $this->id,
            'name' => $this->name,
            'gender' => $gender,
            'birthday' => $this->birthday,
            'email' => $this->email,
            'createdAt' => $this->createdAtToString(),
            'updatedAt' => $this->updatedAtToString(),
        ];
    }
}
