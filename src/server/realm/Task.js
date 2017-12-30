module.exports = {
    name: 'Task',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        createdate: 'date',
        deadline: 'date',
        description: 'string',
        assigned: 'User',
        subcribers: 'User[]',
        status: 'int'
    }
};