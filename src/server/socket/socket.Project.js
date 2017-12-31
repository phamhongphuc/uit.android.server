import moment from 'moment';
module.exports = function (io, client, realm) {
    // client.on('ProjectExist', (userId) => {
    //     let user = getUserById(userId);
    //     if (!user) {
    //         console.log('User không tồn tại!');
    //     } else if (!user.projects.length) {
    //         console.log('Không tồn tại project');
    //         client.emit('Notification', 'Project is Empty. Create a new project');
    //     } else {
    //         console.log('Đã có project');
    //         client.emit('Notification', 'Choose project');
    //     }
    // });
    //Edit một Project
    client.on('Edit:Project(project)', (project) => {
        realm.write(() => {
            let newProject = realm.create('Task', project, true);
            client.emit('Edit a Successful Task', newProject);
        });
    });
    //Create Project
    client.on('Create:Project(userId)', (userId) => {
        let user = getUserById(userId);
        realm.write(() => {
            realm.create('Task', {
                id: getNextProjectId(),
                name: 'newProject',
                creator: user,
                description:'newDescription',
                createdate: moment().toDate(),
                deadline: moment().add(1, 'week').toDate()
            });
        });
    });

    // Show ra toàn bộ tên Task mà Project có
    client.on('Get:Project.Tasks(projectId)', (projectId) => {
        let project = getProjectById(projectId);
        let tasksId = [];
        project.tasks.forEach(task => {
            tasksId.push(task.id);
        });
        console.log(tasksId);
        client.emit('Return Channels ID', tasksId);
    });
    // Show ra toàn bộ Channel Id mà Project có
    client.on('Get:Project.Channels(projectId)', (projectId) => {
        let project = getProjectById(projectId);
        let channelsId = [];
        project.channels.forEach(channel => {
            channelsId.push(channel.id);
        });
        console.log(channelsId);
        client.emit('Return Channels ID', channelsId);
    });
    // Show ra toàn bộ Member Id mà Project có
    client.on('Get:Project.Members(projectId)', (projectId) => {
        let project = getProjectById(projectId);
        let membersId = [];
        project.member.forEach(member => {
            membersId.push(member.id);
        });
        console.log(membersId);
        client.emit('Return Members ID', membersId);
    });

    // Trả về toàn bộ thông tin của Project
    client.on('Get:Projec(projectId)', (projectId) => {
        let project = getProjectById(projectId);
        client.emit('Return Project', project);
    });

    function getNextProjectId() {
        return realm.objects('Project').max('id') + 1;
    }

    function getProjectById(projectId) {
        return realm.objects('Project').filtered('id == $0', projectId)[0];
    }

    function getUserById(userId) {
        return realm.objects('User').filtered('id == $0', userId)[0];
    }

};