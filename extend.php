<?php

namespace AntoineFr\Online;

use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Extend\Locales(__DIR__ . '/locale'),
    (new Extend\Settings())
        ->serializeToForum('antoinefr-online.titleoflist', 'antoinefr-online.titleoflist', 'strval', '')
        ->serializeToForum('antoinefr-online.displaymax', 'antoinefr-online.displaymax', 'intval', 5)
];
