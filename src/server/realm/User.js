module.exports = {
    name: 'User',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
        birthdate: 'date?',
        gender: 'bool?',
        email: 'string',
        description: 'string?',
        projects: 'Project[]'
    }
}