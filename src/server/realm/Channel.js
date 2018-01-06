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
    getJson() {
        let properties = [
            'id',
            'name',

            'createdate',
            'lastupdate'
        ];
        let json = properties.reduce((map, obj) => {
            map[obj] = this[obj];
            return map;
        }, {});
        json.assignedId = this.assigned.id;
        json.projectId = this.project.id;
        return json;
    }

}
Channel.schema = {
    name: 'Channel',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',

        createdate: 'date',
        lastupdate: 'date',

        assigned: 'User',
        members: 'User[]',
        project: 'Project',

        messages: {
            type: 'linkingObjects',
            objectType: 'Message',
            property: 'channel'
        }
    }
};

export default Channel;