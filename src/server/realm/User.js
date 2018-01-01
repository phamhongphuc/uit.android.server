class User {
    static setRealm(realm) {
        this.realm = realm;
    }
    static getUserById(userId) {
        return this.realm.objects('User').filtered('id == $0', userId)[0];
    }
    getJson() {
        let properties = ['id', 'name', 'birthdate', 'gender', 'email', 'description', 'lastupdate'];
        return properties.reduce((map, obj) => {
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
        birthdate: 'date?',
        gender: 'bool?',
        email: 'string',
        description: 'string?',
        projects: 'Project[]',
        lastupdate: 'date'
    }
};

export default User;