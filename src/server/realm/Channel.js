export default class Channel {
    static setRealm(realm) {
        this.realm = realm;
    }
    static getChannelById(channelId) {
        return this.realm.objects('Channel').filtered('id == $0', channelId)[0];
    }
}
Channel.schema = {
    name: 'Channel',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
        assigned: 'User',
        members: 'User[]',
        createdate: 'date',
        lastupdate: 'date'
    }
};