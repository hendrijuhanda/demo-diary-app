<?php

namespace Modules\User\Services\Contracts;

use Modules\User\Models\Contracts\UserInterface;

interface UserServiceInterface
{

    /**
     *
     */
    public function create(array $input): UserInterface;

    /**
     *
     */
    public function findByEmail(string $email);
}
