<?php

namespace App\Http\Resources;


class InquiryResource extends BaseResource
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
            'email' => $this->user->email,
            'note' => $this->note,
            'InquiryReplies' => InquiryReplyResource::collection($this->inquiryReplies),
            'createdAt' => $this->createdAtToString()
        ];
    }
}
