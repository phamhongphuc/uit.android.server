module.exports = {
    name: 'Message',
    primaryKey: 'time',
    properties: {
        time: 'date',
        sender: 'User',
        idchannel: 'Channel',
        content: 'string'
    }
};