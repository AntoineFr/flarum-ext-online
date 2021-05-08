import { extend } from 'flarum/common/extend';
import app from 'flarum/app';
import IndexPage from 'flarum/forum/components/IndexPage';
import FieldSet from 'flarum/common/components/FieldSet';
import avatar from 'flarum/common/helpers/avatar';
import username from 'flarum/common/helpers/username';
import ItemList from 'flarum/common/utils/ItemList';

function orderByLastSeenTime(a, b) {
    if (a.lastSeenAt() > b.lastSeenAt())
        return -1;
    if (a.lastSeenAt() < b.lastSeenAt())
        return 1;
    return 0;
}

app.initializers.add('antoinefr-online', function () {
    extend(IndexPage.prototype, 'sidebarItems', function (items) {
        const displayMax = app.forum.attribute('antoinefr-online.displaymax');
        const users = app.store.all('users').filter(u => u.isOnline());
        const total = users.length;
        const displayUsers = users.sort(orderByLastSeenTime).slice(0, displayMax);

        const OnlineUsers = new ItemList();

        let i = 1;
        displayUsers.forEach((user) => {
            OnlineUsers.add('onlineuser-' + i,
                <a href={app.forum.attribute('baseUrl') + '/u/' + user.id()}>
                    {avatar(user, { className: 'OnlineUser-avatar' })}
                    {username(user, { className: 'OnlineUser-name' })}
                </a>
            );
            i += 1;
        });

        if (total > displayMax) {
            OnlineUsers.add('onlineuser-more',
                <p>
                    {app.translator.trans('antoinefr-online.forum.andmore', { more: total - displayMax })}
                </p>
            );
        }

        items.add('onlineUsers',
            FieldSet.component({
                label: app.forum.attribute('antoinefr-online.titleoflist'),
                className: 'OnlineUsers'
            }, OnlineUsers.toArray())
        );
    });
});
