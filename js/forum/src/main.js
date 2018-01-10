import { extend } from 'flarum/extend';
import IndexPage from 'flarum/components/IndexPage';
import ItemList from 'flarum/utils/ItemList';
import FieldSet from 'flarum/components/FieldSet';
import avatar from 'flarum/helpers/avatar';
import username from 'flarum/helpers/username';

function orderByLastSeenTime(a, b) {
    if (a.lastSeenTime() > b.lastSeenTime())
        return -1;
    if (a.lastSeenTime() < b.lastSeenTime())
        return 1;
    return 0;
}

app.initializers.add('antoinefr-online', function() {
    extend(IndexPage.prototype, 'sidebarItems', function(items) {
        const users = app.store.all('users').filter(u => u.isOnline());
        const displayUsers = users.sort(orderByLastSeenTime);
        
        const OnlineUsers = new ItemList();
        
        let i = 1;
        displayUsers.forEach((user) => {
            OnlineUsers.add('onlineuser-' + i, 
                <a href={app.forum.attribute('baseUrl') + '/u/' + user.id()}>
                    {avatar(user, {className: 'OnlineUser-avatar'})}
                    {username(user, {className: 'OnlineUser-name'})}
                </a>
            );
            i += 1;
        });
        
        items.add('onlineUsers',
            FieldSet.component({
              label: app.translator.trans('antoinefr-online.forum.title'),
              className: 'OnlineUsers',
              children: OnlineUsers.toArray()
            })
        );
    });
});
