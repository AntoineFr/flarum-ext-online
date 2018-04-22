System.register('antoinefr/online/main', ['flarum/extend', 'flarum/components/IndexPage', 'flarum/utils/ItemList', 'flarum/components/FieldSet', 'flarum/helpers/avatar', 'flarum/helpers/username'], function (_export) {
    'use strict';

    var extend, IndexPage, ItemList, FieldSet, avatar, username;

    function orderByLastSeenTime(a, b) {
        if (a.lastSeenTime() > b.lastSeenTime()) return -1;
        if (a.lastSeenTime() < b.lastSeenTime()) return 1;
        return 0;
    }

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsIndexPage) {
            IndexPage = _flarumComponentsIndexPage['default'];
        }, function (_flarumUtilsItemList) {
            ItemList = _flarumUtilsItemList['default'];
        }, function (_flarumComponentsFieldSet) {
            FieldSet = _flarumComponentsFieldSet['default'];
        }, function (_flarumHelpersAvatar) {
            avatar = _flarumHelpersAvatar['default'];
        }, function (_flarumHelpersUsername) {
            username = _flarumHelpersUsername['default'];
        }],
        execute: function () {
            app.initializers.add('antoinefr-online', function () {
                extend(IndexPage.prototype, 'sidebarItems', function (items) {
                    var displayMax = parseInt(app.forum.attribute('antoinefr-online.displaymax'));
                    var users = app.store.all('users').filter(function (u) {
                        return u.isOnline();
                    });
                    var total = users.length;
                    var displayUsers = users.sort(orderByLastSeenTime).slice(0, displayMax);

                    var OnlineUsers = new ItemList();

                    var i = 1;
                    displayUsers.forEach(function (user) {
                        OnlineUsers.add('onlineuser-' + i, m(
                            'a',
                            { href: app.forum.attribute('baseUrl') + '/u/' + user.id() },
                            avatar(user, { className: 'OnlineUser-avatar' }),
                            username(user, { className: 'OnlineUser-name' })
                        ));
                        i += 1;
                    });

                    if (total > displayMax) {
                        OnlineUsers.add('onlineuser-more', m(
                            'p',
                            null,
                            'et ',
                            total - displayMax,
                            ' de plus ...'
                        ));
                    }

                    items.add('onlineUsers', FieldSet.component({
                        label: app.forum.attribute('antoinefr-online.titleoflist'),
                        className: 'OnlineUsers',
                        children: OnlineUsers.toArray()
                    }));
                });
            });
        }
    };
});