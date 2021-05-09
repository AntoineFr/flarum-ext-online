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
    }
}
