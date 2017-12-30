module.exports = {
    name: 'Task',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        createdate: 'date',
        deadline: 'date',
        description: 'string',
        assigned: 'user',
        subcribers: 'User[]',
        status: 'int'
    }
};