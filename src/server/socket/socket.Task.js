module.exports = function (io, client, realm) {
    //Xác nhận Task đã hoàn thành
    client.on('CompletedTask', (taskId, userId) => {
        let task = realm.objects('Task').filtered('id == $0', taskId)[0];
        let flag = false;
        task.subscribers.forEach(subscriber => {
            if(subscriber.id == userId){
                flag = true;
            }
        });
        if (flag) {
            realm.write(() => {
                task = realm.create('Task', {
                    status: 2
                }, true);
                client.emit('Confirm Task: Completed', taskId);
            });
        }
    });
    //Trả về toàn bộ thông tin của một Task
    client.on('ChooseTask', (taskId) => {
        let task = realm.objects('Task').filtered('id == $0', taskId)[0];
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
    // Show ra toàn bộ Subscribers Id mà Task có
    client.on('GetAllSubscribersInTask', (taskId) => {
        let task = realm.objects('Task').filtered('id == $0', taskId)[0];
        let subscribersId = [];
        task.subscribers.forEach(subscriber => {
            subscribersId.push(subscriber.id);
        });
        console.log(subscribersId);
        client.emit('Return Subscribers ID', subscribersId);
    });
};