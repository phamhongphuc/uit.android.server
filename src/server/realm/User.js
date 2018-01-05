class User {
    static setRealm(realm) {
        this.realm = realm;
    }
    static getUserById(userId) {
        return this.realm.objects('Channel').find(object => object.id == userId);
    }
    getJson() {
        let properties = [
            'id',
            'name',
            'birthdate',
            'gender',
            'email',
            'description',
            // 'projects',
            'lastupdate'
        ];
        let json = properties.reduce((map, obj) => {
            map[obj] = this[obj];
            return map;
        }, {});
        // json.projects = this.projects.map(project => project.id);
        return json;
    }
}
User.schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
        birthdate: 'date?',
        gender: 'bool?',
        email: 'string',
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
        description: 'string?',
        lastupdate: 'date'
    }
};

export default User;