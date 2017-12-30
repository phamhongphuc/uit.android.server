module.exports = {
    name: 'Channel',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name:'string',
        assigned: 'User',
        members: 'User[]',
        createdate: 'date'
    }
}