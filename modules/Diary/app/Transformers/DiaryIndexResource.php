<?php

namespace Modules\Diary\Transformers;

use Illuminate\Http\Resources\Json\ResourceCollection;

class DiaryIndexResource extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'items' => DiaryResource::collection($this->collection),
            'pagination' => [
                'total' => $this->total(),
                'per_page' => $this->perPage(),
                'current_page' => $this->currentPage(),
                'last_page' => $this->lastPage(),
            ],
        ];
    }
}
