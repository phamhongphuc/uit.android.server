module.exports = function (io, client, realm) {
    client.on('ProjectStatus', (userId) => {
        realm.objects('User').filtered('id == $0', userId);
    });
    client.on('ProjectExist', (userId) => {
        let user = realm.objects('User').filtered('id==$0', userId)[0];
        if (!user) {
            console.log('User không tồn tại!');
        } else if (!user.projects.length) {
            console.log('Không tồn tại project');
            client.emit('Send', 'Project is Empty. Create a new project');
        } else {
            console.log('Đã có project');
            client.emit('Send', 'Chọn project');
        }
    });
    //Tạo một project
    client.on('CreateProject', (project) => {
        realm.write(() => {
            let newProject = realm.create('Project', {
                id: project.id,
                name: project.name,
                tasks: project.tasks,
                member: project.member,
                description: project.description,
                tags: project.tags,
                channels: project.channels,
                createdate: project.createdate,
                deadline: project.deadline
            }, true);
            client.emit('Successful', newProject);
        });
    });
    // Trả về toàn bộ thông tin của một project
    client.on('ChooseProject', (projectId) => {
        let project = getProjectById(projectId);
        client.emit('ProjectData', project);
    });
    // Show ra toàn bộ tên Task mà Project có
    client.on('ShowAllTasks', (projectId) => {
        let project = getProjectById(projectId);
        let tasksName = [];
        project.tasks.forEach(task => {
            tasksName.push(task.name);
        });
        console.log(tasksName);
    });
    // Show ra toàn bộ tên Channel mà Project có
    client.on('ShowAllChannel', (projectId) => {
        let project = getProjectById(projectId);
        let channelsName = [];
        project.channels.forEach(channel => {
            channelsName.push(channel.name);
        });
        console.log(channelsName);
    });
    // Show ra toàn bộ tên Member mà Project có
    client.on('ShowAllMember', (projectId) => {
        let project = getProjectById(projectId);
        let memberrsName = [];
        project.member.forEach(member => {
            memberrsName.push(member.name);
        });
        console.log(memberrsName);
    });

    function getProjectById(projectId) {
        return realm.objects('Project').filtered('id == $0', projectId)[0];
    }
};