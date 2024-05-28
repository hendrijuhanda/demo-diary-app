<?php

namespace Modules\Diary\Repositories;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Modules\Diary\Models\Contracts\DiaryInterface;
use Modules\Diary\Models\Diary;
use Modules\Diary\Repositories\Contracts\DiaryRepositoryInterface;

class DiaryRepository implements DiaryRepositoryInterface
{

    /**
     *
     */
    public function listWithPagination(): LengthAwarePaginator
    {
        return Diary
            ::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->paginate(request()->get('per_page'), ['*'], null, request()->get('page'));
    }

    /**
     *
     */
    public function create(array $input): DiaryInterface
    {
        return Diary::create($input);
    }

    /**
     *
     */
    public function getById(int $id): DiaryInterface
    {
        return Diary::findOrFail($id);
    }

    /**
     *
     */
    public function update(int $id, array $input): DiaryInterface
    {
        $diary = Diary::find($id);

        $diary->update($input);

        return $diary;
    }

    /**
     *
     */
    public function delete(int $id)
    {
        $this->getById($id);

        return Diary::destroy($id);
    }
}
