export default class OnlineState {
    constructor() {
        this.users = app.store.all('online');
    }
}
