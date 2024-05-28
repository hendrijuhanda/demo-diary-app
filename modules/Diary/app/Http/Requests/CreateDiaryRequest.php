<?php

namespace Modules\Diary\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateDiaryRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string',
            'detail' => 'required|string',
            'picture' => 'required|mimes:jpeg,png,jpg|max:1024'
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
}
