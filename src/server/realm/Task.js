export default class Task {
    static setRealm(realm) {
        this.realm = realm;
    }
    static getTaskById(taskId) {
        return this.realm.objects('Task').filtered('id == $0', taskId)[0];
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
        createdate: 'date',
        deadline: 'date',
        description: 'string?',
        assigned: 'User',
        subscribers: 'User[]',
        status: 'int',
        project: 'Project',
        lastupdate: 'date'
    }
};