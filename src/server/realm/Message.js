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
}
Message.schema = {
    name: 'Message',
    primaryKey: 'id',
    properties: {
        id: 'int',
        time: 'date',
        sender: 'User',
        channel: 'Channel',
        content: 'string'
    }
};

export default Message;