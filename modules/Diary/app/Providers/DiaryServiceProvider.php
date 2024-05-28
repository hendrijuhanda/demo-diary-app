<?php

namespace Modules\Diary\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\Diary\Repositories\Contracts\DiaryRepositoryInterface;
use Modules\Diary\Repositories\DiaryRepository;
use Modules\Diary\Services\Contracts\DiaryServiceInterface;
use Modules\Diary\Services\DiaryService;

class DiaryServiceProvider extends ServiceProvider
{
    protected string $moduleName = 'Diary';

    protected string $moduleNameLower = 'diary';

    /**
     * Boot the application events.
     */
    public function boot(): void
    {
    }

    /**
     * Register the service provider.
     */
    public function register(): void
    {
        $this->app->register(RouteServiceProvider::class);

        $this->app->bind(DiaryRepositoryInterface::class, DiaryRepository::class);
        $this->app->bind(DiaryServiceInterface::class, DiaryService::class);
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array<string>
     */
    public function provides(): array
    {
        return [];
    }
}
