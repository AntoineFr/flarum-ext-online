<?php

namespace AntoineFr\Online;

use Carbon\Carbon;
use Flarum\Api\Controller\ShowForumController;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class LoadOnline
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(ShowForumController $controller, &$data, ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $ago = Carbon::now()->subtract(5, 'minutes');

        $online = User::query()->whereRaw('? < last_seen_at', [$ago])->get();

        $filtered = collect($online)->map(function ($user) use ($actor) {
            if ($user->getPreference('discloseOnline') || $actor->can('viewLastSeenAt', $user)) {
                return $user;
            }
        });

        $max = (int) $this->settings->get('antoinefr-online.displaymax', 5);

        $data['online'] = $filtered->slice(0, $max <= 0 ? null : $max);
    }
}
