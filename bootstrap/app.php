<?php

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (Throwable $e, Request $request) {
            if ($request->is('api/*')) {
                $data = null;
                $status = Response::HTTP_INTERNAL_SERVER_ERROR;

                if ($e instanceof ValidationException) {
                    $data = $e->errors();
                    $status = $e->status;
                }

                if ($e instanceof HttpException) {
                    $status = $e->getStatusCode();
                }

                if ($e instanceof AuthenticationException) {
                    $status = Response::HTTP_UNAUTHORIZED;
                }

                $format = [
                    'status' => false,
                    'service' => $request->route()?->getName(),
                    'message' => $e->getMessage(),
                    'data' => $data
                ];

                return response()->json($format, $status);
            }
        });
    })->create();
