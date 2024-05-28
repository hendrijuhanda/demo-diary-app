<?php

namespace Modules\User\Repositories;

use Modules\User\Models\Contracts\UserInterface;
use Modules\User\Models\User;
use Modules\User\Repositories\Contracts\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    /**
     *
     */
    public function create(array $input): UserInterface
    {
        return User::create($input);
    }

    /**
     *
     */
    public function findBy(string $field, $value)
    {
        return User::where($field, $value)->firstOrFail();
    }
}
