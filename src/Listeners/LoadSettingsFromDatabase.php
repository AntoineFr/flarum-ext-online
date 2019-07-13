<?php namespace AntoineFr\Online\Listeners;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\ForumSerializer;

class LoadSettingsFromDatabase
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings) {
        $this->settings = $settings;
    }

    public function subscribe(Dispatcher $events) {
        $events->listen(Serializing::class, [$this, 'prepareApiAttributes']);
    }

    public function prepareApiAttributes(Serializing $event) {
        if ($event->isSerializer(ForumSerializer::class)) {
            $event->attributes['antoinefr-online.displaymax'] = $this->settings->get('antoinefr-online.displaymax');
            $event->attributes['antoinefr-online.titleoflist'] = $this->settings->get('antoinefr-online.titleoflist');
        }
    }
}
