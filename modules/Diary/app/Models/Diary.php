<?php

namespace Modules\Diary\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Modules\Diary\Models\Contracts\DiaryInterface;

class Diary extends Model implements DiaryInterface
{
    protected $table = self::TABLE;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'detail',
        'picture',
    ];

    protected $appends = ['picture_url'];

    /**
     *
     */
    public function getPictureUrlAttribute(): string
    {
        return asset('/storage' . $this->picture);
    }
}
