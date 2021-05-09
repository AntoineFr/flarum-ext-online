<?php

namespace AntoineFr\Online\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Http\SlugManager;
use Flarum\User\User;

class OnlineSerializer extends AbstractSerializer
{
    protected $type = 'online';
    protected $slugManager;

    public function __construct(SlugManager $slugManager)
    {
        $this->slugManager = $slugManager;
    }

    protected function getDefaultAttributes($user)
    {
        return [
            'username'    => $user->username,
            'displayName' => $user->display_name,
            'avatarUrl'   => $user->avatar_url,
            'slug'        => $this->slugManager->forResource(User::class)->toSlug($user),
            'lastSeenAt'  => $user->last_seen_at
        ];
    }
}
