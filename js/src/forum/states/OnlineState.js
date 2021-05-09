export default class OnlineState {
    constructor() {
        this.users = app.store.all('online');
        this.users.sort((a, b) => {
            if (a.lastSeenAt() > b.lastSeenAt()) {
                return -1;
            }

            if (a.lastSeenAt() < b.lastSeenAt()) {
                return 1;
            }

            return 0;
        });
        this.onlineMore = app.forum.data.relationships.onlineMore;
    }

    isMore() {
        return typeof this.onlineMore !== 'undefined';
    }

    getMore() {
        return this.onlineMore.data.id;
    }
}
