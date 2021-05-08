<?php

namespace AntoineFr\Online;

use AntoineFr\Online\Api\Serializer\OnlineSerializer;
use Flarum\Extend;
use Flarum\Api\Controller\ShowForumController;
use Flarum\Api\Serializer\ForumSerializer;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Extend\Locales(__DIR__ . '/locale'),

    (new Extend\Settings())
        ->serializeToForum('antoinefr-online.titleoflist', 'antoinefr-online.titleoflist', 'strval', ''),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->hasMany('online', OnlineSerializer::class),

    (new Extend\ApiController(ShowForumController::class))
        ->addInclude('online')
        ->prepareDataForSerialization(LoadOnline::class)
];
