class Message {
    static setRealm(realm) {
        this.realm = realm;
    }
    static getMessageById(messageId) {
        return this.realm.objects('Message').filtered('id == $0', messageId)[0];
    }
}
Message.schema = {
    name: 'Message',
    primaryKey: 'id',
    properties: {
        id: 'int',
        time: 'date',
        sender: 'User',
        idchannel: 'Channel',
        content: 'string'
    }
};

export default Message;