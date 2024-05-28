<?php

namespace Modules\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Modules\Auth\Http\Requests\LoginRequest;
use Modules\Auth\Http\Requests\RegisterRequest;
use Modules\User\Services\Contracts\UserServiceInterface;

class AuthController extends Controller
{
    protected UserServiceInterface $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    /**
     *
     */
    public function login(LoginRequest $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            throw new AuthenticationException();
        }

        $user = $this->userService->findByEmail($request->input('email'));

        $data = [
            'name' => $user->name,
            'email' => $user->email,
            'token' => $user->createToken('access_token')->plainTextToken,
            'token_type' => 'Bearer'
        ];

        return response()->json(self::responseFormat($data), Response::HTTP_OK);
    }

    /**
     *
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = $this->userService->create($request->validated());

        return response()->json(self::responseFormat($user), Response::HTTP_OK);
    }

    /**
     *
     */
    public function session(): JsonResponse
    {
        $user = Auth::user();

        info($user->name);

        if (!$user) {
            throw new AuthenticationException();
        }

        $data = [
            'name' => $user->name,
            'email' => $user->email,
        ];

        return response()->json(self::responseFormat($data), Response::HTTP_OK);
    }

    /**
     *
     */
    public function logout()
    {
        $user = Auth::user();

        if ($user) {
            /** @var Modules\User\Models\User $user */
            $user->tokens()->delete();
        }

        return response()->json(self::responseFormat(!!$user), Response::HTTP_OK);
    }
}
