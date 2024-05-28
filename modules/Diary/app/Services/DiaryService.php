<?php

namespace Modules\Diary\Services;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Modules\Diary\Models\Contracts\DiaryInterface;
use Modules\Diary\Repositories\Contracts\DiaryRepositoryInterface;
use Modules\Diary\Services\Contracts\DiaryServiceInterface;
use Modules\Transaction\Models\Contracts\TransactionInterface;
use Modules\Transaction\Repositories\Contracts\TransactionRepositoryInterface;
use Modules\Transaction\Services\Contracts\TransactionServiceInterface;

use function Laravel\Prompts\error;

class DiaryService implements DiaryServiceInterface
{
    private DiaryRepositoryInterface $diaryRepository;

    public function __construct(DiaryRepositoryInterface $diaryRepository)
    {
        $this->diaryRepository = $diaryRepository;
    }

    /**
     *
     */
    public function index(): LengthAwarePaginator
    {
        return $this->diaryRepository->listWithPagination();
    }

    /**
     *
     */
    public function create(array $input): DiaryInterface
    {
        $file = request()->file('picture');
        $filename = $file->getClientOriginalName();

        $path = '/diary-picture/' . Str::random() . '-' . $filename;

        Storage::disk('public')->put($path, file_get_contents($file));

        $input['user_id'] = Auth::id();
        $input['picture'] = $path;

        return $this->diaryRepository->create($input);
    }

    /**
     *
     */
    public function show(int $id): DiaryInterface
    {
        return $this->diaryRepository->getById($id);
    }

    /**
     *
     */
    public function update(int $id, array $input): DiaryInterface
    {
        $diary = $this->show($id);

        if (request()->hasFile('picture')) {
            $file = request()->file('picture');
            $filename = $file->getClientOriginalName();

            $path = '/diary-picture/' . Str::random() . '-' . $filename;

            try {
                Storage::disk('public')->delete($diary->picture);
            } catch (\Exception $e) {
                error($e->getMessage());
            }

            Storage::disk('public')->put($path, file_get_contents($file));

            $input['picture'] = $path;
        }

        return $this->diaryRepository->update($id, $input);
    }

    /**
     *
     */
    public function delete(int $id)
    {
        return $this->diaryRepository->delete($id);
    }
}
