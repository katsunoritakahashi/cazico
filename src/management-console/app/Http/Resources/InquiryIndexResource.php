<?php

namespace App\Http\Resources;


class InquiryIndexResource extends BaseResource
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
            'familyName' => $this->user->family->name,
            'userName' => $this->user->name,
            'title' => $this->title,
            'body' => $this->body,
            'status' => $this->status,
            'createdAt' => $this->createdAtToString()
        ];
    }
}
