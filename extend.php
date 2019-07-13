<?php namespace AntoineFr\Online;
use Flarum\Extend;
use Flarum\Extend\Frontend;
use Flarum\Extend\Locales;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')

    , (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')

    , (new Extend\Frontend('forum'))
        ->css(__DIR__ . '/less/forum.less')

    , new Extend\Locales(__DIR__ . '/locale')

    , function (Dispatcher $events) {
        $events->subscribe(Listeners\LoadSettingsFromDatabase::class);
    }
];
