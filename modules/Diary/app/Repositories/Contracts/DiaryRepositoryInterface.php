<?php

namespace Modules\Diary\Repositories\Contracts;

use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Diary\Models\Contracts\DiaryInterface;

interface DiaryRepositoryInterface
{

    /**
     *
     */
    public function listWithPagination(): LengthAwarePaginator;

    /**
     *
     */
    public function create(array $input): DiaryInterface;

    /**
     *
     */
    public function getById(int $id): DiaryInterface;

    /**
     *
     */
    public function update(int $id, array $input): DiaryInterface;

    /**
     *
     */
    public function delete(int $id);
}
