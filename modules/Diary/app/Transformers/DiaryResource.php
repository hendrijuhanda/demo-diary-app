<?php

namespace Modules\Diary\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class DiaryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'detail' => $this->detail,
            'picture_url' => $this->picture_url,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
