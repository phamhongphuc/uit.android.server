import moment from 'moment';
module.exports = function (io, client, realm) {
    //Subscriber Join một task
    client.on('Join:Task(userId)', (taskId, userId) => {
        realm.write(() => {
            let task = getTaskById(taskId);
            let user = getUserById(userId);
            task.subscribers.push(user);
            client.emit('Join a Successful Task', taskId);
        });
    });
    //Xác nhận Task đã hoàn thành
    client.on('Confirm:Task(taskId,userId)', (taskId, userId) => {
        let task = getTaskById(taskId);
        realm.write(() => {
            let isUpdate = task.subscribers.some(subscriber => {
                if (subscriber.id == userId) {
                    subscriber.status = 2;
                    return true;
                }
                return false;
            });
            if(isUpdate){
                task.lastupdate = new Date();
            }
        });
        client.emit('Confirm Task: Completed', taskId);
    });
    //Edit một task
    client.on('Edit:Task(task)', (task) => {
        realm.write(() => {
            task.lastupdate = new Date();
            let newTask = realm.create('Task', task, true);
            client.emit('Edit a Successful Task', newTask);
        });
    });
    //Create Task
    client.on('Create:Task(userId,projectId)', (userId, projectId) => {
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
                project: project,
                lastupdate: new Date()
            });
        });
    });
    // Show ra toàn bộ Subscribers Id mà Task có
    client.on('Get:Task.Subscribers(taskId)', (taskId) => {
        let task = getTaskById(taskId);
        let subscribersId = [];
        task.subscribers.forEach(subscriber => {
            subscribersId.push(subscriber.id);
        });
        console.log(subscribersId);
        client.emit('Return Subscribers ID', subscribersId);
    });
    // Trả về toàn bộ thông tin của Task
    client.on('Get:Task(taskId)', (taskId) => {
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