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
    client.on('CreateProject', (project) => {
        realm.write(() => {
            realm.create('Project', {
                id: project.id,
                name: project.name,
                task: project.task,
                member: project.member,
                description: project.description,
                tag: project.tags,
                channel: project.channel,
                createdate: project.createdate,
                deadline: project.deadline
            });
        });
    });
    client.on('ChooseProject', (projectName) => {
        
    });

};