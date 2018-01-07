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
        let json = [
            'id',
            'name',
            'description',

            'createdate',
            'deadline',
            'lastupdate'
        ].reduce((map, obj) => {
            map[obj] = this[obj];
            return map;
        }, {});
        return json;
    }
    getCreator() {
        return this.creator ? this.creator.getJson() : undefined;
    }
    getMembers() {
        return this.members.map(
            member => member.getJson()
        );
    }
    getTasks() {
        return this.tasks.map(task => {
            let taskJson = task.getJson();
            taskJson.assigned = task.assigned.getJson();
            taskJson.subscribers = task.subscribers.map(
                user => user.getJson()
            );
            taskJson.project = task.project.getJson();
            return taskJson;
        });
    }
    getChannels() {
        return this.channels.map(channel => {
            let channelJson = channel.getJson();
            channelJson.members = channel.members.map(
                user => user.getJson()
            );
            return channelJson;
        });
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