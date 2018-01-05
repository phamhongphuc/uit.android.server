class User {
    static setRealm(realm) {
        this.realm = realm;
    }
    static getUserById(userId) {
        return this.realm.objects('User').filtered('id == $0', userId)[0];
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
        description: 'string?',
        lastupdate: 'date'
    }
};

export default User;