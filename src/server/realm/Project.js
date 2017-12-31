module.exports = {
    name: 'Project',
    primaryKey: 'id',
    properties:{
        id:'string',
        name:'string',
        tasks:'Task[]',
        creator: 'User',
        member:'User[]',
        description:'string?',
        tags:'string[]',
        channels:'Channel[]',
        createdate:'date',
        deadline:'date'
    }
};