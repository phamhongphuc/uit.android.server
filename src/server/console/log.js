module.exports = function (app) {

    let realm = app.realm;

    let task = {
        id: 0,
        name: 'yeah'
    };
    realm.write(() => {
        let newTask = realm.create('Task', {
            id: task.id,
            name: task.name
        }, true);
        console.log(newTask);
    });

    // client.on('EditTask', (task) => {
    // });
    // let user = app.realm
    //     .objects('User')
    //     .filtered('id == $0', '891448197630355')[0];
    // if (!user) {
    //     console.log('Không tồn tại user');
    // } else if (!user.projects.length) {
    //     console.log('Không tồn tại project');
    //     app.client.emit('Send', 'Không có Project');

    // } else {
    //     let projectsName = [];
    //     user.projects.forEach(project => {
    //         projectsName.push(project);
    //     });
    //     console.log(projectsName);
    //     console.log('Đã có project');
    // }

};