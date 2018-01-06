import Realm from 'realm';
class Project {
    static setRealm(realm) {
        this.realm = realm;
    }
    static getNextProjectId() {
        let projects = this.realm.objects('Project');
        return projects.length == 0 ? 1 : projects.max('id') + 1;
    }
    static getProjectById(projectId) {
        return this.realm.objects('Project').find(object => object.id == projectId);
    }
    getJson() {
        let properties = [
            'id',
            'name',
            'description',

            'createdate',
            'deadline',
            'lastupdate'
        ];
        let json = properties.reduce((map, obj) => {
            map[obj] = this[obj];
            return map;
        }, {});
        json.creatorId = this.creator.id;
        return json;
    }
}
Project.schema = {
    name: 'Project',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        description: 'string?',

        // Sẽ bỏ đi
        tags: 'string[]',

        createdate: 'date',
        deadline: 'date',
        lastupdate: 'date',

        creator: 'User',
        members: 'User[]',

        channels: {
            type: 'linkingObjects',
            objectType: 'Channel',
            property: 'project'
        },
        tasks: {
            type: 'linkingObjects',
            objectType: 'Task',
            property: 'project'
        },
    }
};

export default Project;