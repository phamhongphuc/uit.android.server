class Project {
    static setRealm(realm) {
        this.realm = realm;
    }
    static getNextProjectId() {
        return this.realm.objects('Project').max('id') + 1;
    }

    static getProjectById(projectId) {
        return this.realm.objects('Project').filtered('id == $0', projectId)[0];
    }
}
Project.schema = {
    name: 'Project',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
        tasks: 'Task[]',
        creator: 'User',
        member: 'User[]',
        description: 'string?',
        tags: 'string[]',
        channels: 'Channel[]',
        createdate: 'date',
        deadline: 'date',
        lastupdate: 'date'
    }
};

export default Project;