<?php

namespace App\Http\Controllers;

abstract class Controller
{
    protected static function responseFormat($data = null)
    {
        return [
            'status' => true,
            'service' => request()->route()->getName(),
            'data' => $data
        ];
    }
}
