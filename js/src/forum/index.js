import { extend } from 'flarum/common/extend';
import app from 'flarum/app';
import User from 'flarum/common/models/User';
import IndexPage from 'flarum/forum/components/IndexPage';

import OnlineUsers from './components/OnlineUsers';

app.initializers.add('antoinefr-online', () => {
    app.store.models.online = User;

    extend(IndexPage.prototype, 'sidebarItems', function (items) {
        items.add('onlineUsers', m(OnlineUsers));
    });
});
