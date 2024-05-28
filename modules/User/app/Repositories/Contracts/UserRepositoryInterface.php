<?php

namespace Modules\User\Repositories\Contracts;

use Modules\User\Models\Contracts\UserInterface;

interface UserRepositoryInterface
{

    /**
     *
     */
    public function create(array $input): UserInterface;

    /**
     *
     */
    public function findBy(string $field, $value);
}
