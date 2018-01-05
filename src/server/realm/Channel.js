class Channel {
    static setRealm(realm) {
        this.realm = realm;
    }
    static getChannelById(channelId) {
        return this.realm.objects('Channel').filtered('id == $0', channelId)[0];
    }
    static getNextChannelId() {
        let channels = this.realm.objects('Channel');
        return channels.length == 0 ? 1 : channels.max('id') + 1;
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
        project: 'Project',
        createdate: 'date',
        lastupdate: 'date'
    }
};

export default Channel;