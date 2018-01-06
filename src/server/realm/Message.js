class Message {
    static setRealm(realm) {
        this.realm = realm;
    }
    static getMessageById(messageId) {
        return this.realm.objects('Message').find(object => object.id == messageId);
    }
    static getNextMessagelId() {
        let messages = this.realm.objects('Message');
        return messages.length == 0 ? 1 : messages.max('id') + 1;
    }
    getJson() {
        let properties = [
            'id',
            'time',
            'content',
        ];
        let json = properties.reduce((map, obj) => {
            map[obj] = this[obj];
            return map;
        }, {});
        json.senderId = this.sender.id;
        json.channelId = this.channel.id;
        return json;
    }
}
Message.schema = {
    name: 'Message',
    primaryKey: 'id',
    properties: {
        id: 'int',
        time: 'date',
        content: 'string',

        sender: 'User',
        channel: 'Channel'
    }
};

export default Message;