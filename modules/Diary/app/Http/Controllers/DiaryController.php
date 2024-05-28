<?php

namespace Modules\Diary\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Modules\Diary\Http\Requests\CreateDiaryRequest;
use Modules\Diary\Http\Requests\DiaryIndexRequest;
use Modules\Diary\Http\Requests\UpdateDiaryRequest;
use Modules\Diary\Services\Contracts\DiaryServiceInterface;
use Modules\Diary\Transformers\DiaryIndexResource;
use Modules\Diary\Transformers\DiaryResource;

class DiaryController extends Controller
{
    private DiaryServiceInterface $diaryService;

    public function __construct(DiaryServiceInterface $diaryService)
    {
        $this->diaryService = $diaryService;
    }

    /**
     *
     */
    public function index(DiaryIndexRequest $request): JsonResponse
    {
        $diaries = $this->diaryService->index();

        return response()->json(self::responseFormat(new DiaryIndexResource($diaries)), Response::HTTP_OK);
    }


    /**
     *
     */
    public function store(CreateDiaryRequest $request): JsonResponse
    {
        $diary = $this->diaryService->create($request->all());

        return response()->json(self::responseFormat(new DiaryResource($diary)), Response::HTTP_CREATED);
    }

    /**
     *
     */
    public function show($id): JsonResponse
    {
        $diary = $this->diaryService->show($id);

        return response()->json(self::responseFormat(new DiaryResource($diary)), Response::HTTP_OK);
    }


    /**
     *
     */
    public function update(UpdateDiaryRequest $request): JsonResponse
    {
        $diary = $this->diaryService->update($request->input('id'), $request->only(['title', 'detail']));

        return response()->json(self::responseFormat(new DiaryResource($diary)), Response::HTTP_OK);
    }

    /**
     *
     */
    public function destroy($id): JsonResponse
    {
        $this->diaryService->delete($id);

        return response()->json('deleted', Response::HTTP_OK);
    }
}
