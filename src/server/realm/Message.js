module.exports = {
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