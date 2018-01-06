class Task {
    static setRealm(realm) {
        this.realm = realm;
    }
    static getTaskById(taskId) {
        return this.realm.objects('Task').find(object => object.id == taskId);
    }
    static getNextTaskId() {
        return this.realm.objects('Task').max('id') + 1;
    }
    getJson() {
        let properties = [
            'id',
            'name',
            'description',
            'status',

            'createdate',
            'deadline',
            'lastupdate'
        ];
        let json = properties.reduce((map, obj) => {
            map[obj] = this[obj];
            return map;
        }, {});
        json.assignedId = this.assigned.id;
        json.projectId = this.project.id;
        return json;
    }
}
Task.schema = {
    name: 'Task',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        description: 'string?',
        status: 'int',

        createdate: 'date',
        deadline: 'date',
        lastupdate: 'date',

        assigned: 'User',
        subscribers: 'User[]',
        project: 'Project',
    }
};

export default Task;