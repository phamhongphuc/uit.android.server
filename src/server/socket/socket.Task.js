import moment from 'moment';
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
        realm.write(() => {
            task.subscribers.some(subscriber => {
                if (subscriber.id == userId) {
                    subscriber.status = 2;
                    return true;
                }
                return false;
            });
        });
        client.emit('Confirm Task: Completed', taskId);
    });
    //Edit một task
    client.on('EditTask', (task) => {
        realm.write(() => {
            let newTask = realm.create('Task', task, true);
            client.emit('Edit a Successful Task', newTask);
        });
    });
    //Create Task
    client.on('CreateTask', (userId, projectId) => {
        let user = getUserById(userId);
        let project = getProjectById(projectId);
        realm.write(() => {
            realm.create('Task', {
                id: getNextTaskId(),
                name: 'newTask',
                createdate: moment().toDate(),
                deadline: moment().add(1, 'week').toDate(),
                status: 0,
                assigned: user,
                project: project
            });
        });
    });
    // Show ra toàn bộ Subscribers Id mà Task có
    client.on('Task.Subscribers(taskId)', (taskId) => {
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

    function getNextTaskId() {
        return realm.objects('Task').max('id') + 1;
    }

    function getTaskById(taskId) {
        return realm.objects('Task').filtered('id == $0', taskId)[0];
    }

    function getUserById(userId) {
        return realm.objects('User').filtered('id == $0', userId)[0];
    }

    function getProjectById(projectId) {
        return realm.objects('Project').filtered('id == $0', projectId)[0];
    }
};