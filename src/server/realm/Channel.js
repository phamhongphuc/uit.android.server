class Channel {
    static setRealm(realm) {
        this.realm = realm;
    }
    static getChannelById(channelId) {
        return this.realm.objects('Channel').find(object => object.id == channelId);
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
        messages: {
            type: 'linkingObjects',
            objectType: 'Message',
            property: 'channel'
        },
        createdate: 'date',
        lastupdate: 'date'
    }
};

export default Channel;