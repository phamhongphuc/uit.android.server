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
        return this.realm.objects('Channel').find(object => object.id == projectId);
    }
    getJson() {
        let properties = [
            'id',
            'name',
            // 'tasks',
            // 'creator',
            // 'members',
            'description',
            // 'tags',
            // 'channels',
            'createdate',
            'deadline',
            'lastupdate'
        ];
        let json = properties.reduce((map, obj) => {
            map[obj] = this[obj];
            return map;
        }, {});
        json.tasks = this.tasks.map(task => task.id);
        json.creatorId = this.creator.id;
        json.membersId = this.members.map(member => member.id);
        json.channelsId = this.channels.map(channel => channel.id);
        return json;
    }
}
Project.schema = {
    name: 'Project',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        creator: 'User',
        members: 'User[]',
        description: 'string?',
        tags: 'string[]',
        createdate: 'date',
        deadline: 'date',
        lastupdate: 'date'
    }
};

export default Project;