class User {
    static setRealm(realm) {
        this.realm = realm;
    }
    static getUserById(userId) {
        return this.realm.objects('User').find(object => object.id == userId);
    }
    getJson() {
        return [
            'id',
            'name',
            'description',

            'birthdate',
            'gender',
            'email',

            'lastupdate'
        ].reduce((map, obj) => {
            map[obj] = this[obj];
            return map;
        }, {});
    }
}
User.schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
        description: 'string?',

        birthdate: 'date?',
        gender: 'bool?',
        email: 'string',

        lastupdate: 'date',
        
        projects: {
            type: 'linkingObjects',
            objectType: 'Project',
            property: 'members'
        },
        projectsOwn: {
            type: 'linkingObjects',
            objectType: 'Project',
            property: 'creator'
        },
        tasks: {
            type: 'linkingObjects',
            objectType: 'Task',
            property: 'subscribers'
        },
        tasksOwn: {
            type: 'linkingObjects',
            objectType: 'Task',
            property: 'assigned'
        },
        channels: {
            type: 'linkingObjects',
            objectType: 'Channel',
            property: 'members'
        },
        channelsOwn: {
            type: 'linkingObjects',
            objectType: 'Channel',
            property: 'assigned'
        },
    }
};

export default User;