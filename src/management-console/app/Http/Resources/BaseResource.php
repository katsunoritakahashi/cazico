<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class BaseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }

    /**
     * @return string
     */
    public function createdAtToString() {
        return dateToString($this->created_at);
    }

    /**
     * @return string
     */
    public function updatedAtToString() {
        return dateToString($this->updated_at);
    }

    protected function noImageResource($id) {
        $index = $id % 5;
        return [
            'id' => 0,
            'name' => 'noimage.png',
            'url' => "https://owner-c-public.s3-ap-northeast-1.amazonaws.com/noimage{$index}.jpg"
        ];
    }
}

function dateToString(string $time) {
    return Carbon::createFromFormat('Y-m-d H:i:s', $time)->format('Y/m/d H:i');
}
