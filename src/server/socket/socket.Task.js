module.exports = function (io, client, realm) {
    //Trả về toàn bộ thông tin của một Task
    client.on('ChooseTask', (taskId) => {
        let task = realm.objects('Task').filtered('id==$0', {
            taskId
        })[0];
        client.emit('TaskData', task);
    });
    //Tạo mới một task
    client.on('CreateTask', (task) => {
        realm.write(() => {
            let newTask = realm.create('Task', {
                id: task.id,
                name: task.name,
                createdate: task.createdate,
                description: task.description,
                assigned: task.assigned,
                subscribers: task.subscribers,
                status: task.status
            }, true);
            client.emit('Successful', newTask);
        });
    });
    // Show ra toàn bộ tên Subscribers mà Task có
    client.on('ShowAllSubscribers', (taskId) => {
        let task = realm.objects('Task').filtered('id == $0', taskId)[0];
        let subscribersName = [];
        task.subscribers.forEach(subscriber => {
            subscribersName.push(subscriber.name);
        });
        console.log(subscribersName);
    });
};