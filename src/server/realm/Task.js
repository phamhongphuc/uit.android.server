class Task {
    static setRealm(realm) {
        this.realm = realm;
    }
    static getTaskById(taskId) {
        return this.realm.objects('Channel').find(object => object.id == taskId);
    }
    static getNextTaskId() {
        return this.realm.objects('Task').max('id') + 1;
    }
}
Task.schema = {
    name: 'Task',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        description: 'string?',
        assigned: 'User',
        subscribers: 'User[]',
        status: 'int',
        project: 'Project',
        createdate: 'date',
        deadline: 'date',
        lastupdate: 'date'
    }
};

export default Task;