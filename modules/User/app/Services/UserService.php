<?php

namespace Modules\User\Services;

use Illuminate\Support\Facades\Hash;
use Modules\User\Models\Contracts\UserInterface;
use Modules\User\Repositories\Contracts\UserRepositoryInterface;
use Modules\User\Services\Contracts\UserServiceInterface;

class UserService implements UserServiceInterface
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     *
     */
    public function create(array $input): UserInterface
    {
        $input['password'] = Hash::make($input['password']);

        return $this->userRepository->create($input);
    }

    /**
     *
     */
    public function findByEmail(string $email)
    {
        return $this->userRepository->findBy('email', $email);
    }
}
