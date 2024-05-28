<?php

namespace Modules\Diary\Services\Contracts;

use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Diary\Models\Contracts\DiaryInterface;

interface DiaryServiceInterface
{

    /**
     *
     */
    public function index(): LengthAwarePaginator;

    /**
     *
     */
    public function create(array $input): DiaryInterface;

    /**
     *
     */
    public function show(int $id): DiaryInterface;

    /**
     *
     */
    public function update(int $id, array $input): DiaryInterface;

    /**
     *
     */
    public function delete(int $id);
}
