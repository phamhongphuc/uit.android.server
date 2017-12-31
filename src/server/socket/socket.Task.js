module.exports = function (io, client, realm) {
    //Subscriber Join một task
    client.on('SubscriberJoinInTask', (taskId, userId) => {
        realm.write(() => {
            let task = getTaskById(taskId);
            let user = getUserById(userId);
            task.subscribers.push(user);
            client.emit('Join a Successful Task', taskId);
        });
    });
    //Xác nhận Task đã hoàn thành
    client.on('CompletedTask', (taskId, userId) => {
        let task = getTaskById(taskId);
        let flag = false;
        task.subscribers.forEach(subscriber => {
            if (subscriber.id == userId) {
                flag = true;
            }
        });
        if (flag) {
            realm.write(() => {
                realm.create('Task', {
                    status: 2
                }, true);
                client.emit('Confirm Task: Completed', taskId);
            });
        }
    });
    //Edit một task
    client.on('EditTask', (task) => {
        realm.write(() => {
            let newTask = realm.create('Task', task, true);
            client.emit('Edit a Successful Task', newTask);
        });
    });
    // Show ra toàn bộ Subscribers Id mà Task có
    client.on('GetAllSubscribersInTask', (taskId) => {
        let task = getTaskById(taskId);
        let subscribersId = [];
        task.subscribers.forEach(subscriber => {
            subscribersId.push(subscriber.id);
        });
        console.log(subscribersId);
        client.emit('Return Subscribers ID', subscribersId);
    });
    // Trả về toàn bộ thông tin của Task
    client.on('GetUserById', (taskId) => {
        let task = getTaskById(taskId);
        client.emit('Return Task', task);
    });

    function getTaskById(taskId) {
        return realm.objects('Task').filtered('id == $0', taskId)[0];
    }
    function getUserById(userId) {
        return realm.objects('User').filtered('id == $0', userId)[0];
    }
};