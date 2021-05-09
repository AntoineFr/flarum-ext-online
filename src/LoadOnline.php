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
        /** @var User */
        $actor = $request->getAttribute('actor');
        $ago = Carbon::now()->subtract(5, 'minutes');

        $users = User::query()->whereRaw('? < last_seen_at', [$ago])->get();

        $filtered = collect($users)->filter(function (User $user) use ($actor) {
            return ($user->getPreference('discloseOnline') || $actor->can('viewLastSeenAt', $user));
        });

        $max = (int) $this->settings->get('antoinefr-online.displaymax');

        $online = collect();
        $onlineMore = 0;

        if ($max < 0) {
            $online->push(...$filtered);
        } else if ($max === 0) {
            $onlineMore = $filtered->count();
        } else {
            $sliced = $filtered->slice(0, $max);
            $online->push(...$sliced);
            $onlineMore = $filtered->count() - $sliced->count();
        }

        $data['online'] = $online;
        $data['onlineMore'] = $onlineMore;
    }
}
