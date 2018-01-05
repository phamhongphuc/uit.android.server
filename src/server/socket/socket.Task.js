import moment from 'moment';
import User from '../realm/User';
import Task from '../realm/Task';
import Project from '../realm/Project';

module.exports = function (io, client, realm) {
    //Subscriber Join một task
    client.on('Join:Task(taskId, userId)', (taskId, userId, callback) => {
        let task = Task.getTaskById(taskId);
        let user = User.getUserById(userId);
        if (!task || !user) {
            callback('Task hoặc User không tồn tại');
        } else {
            realm.write(() => {
                task.subscribers.push(user);
                callback(null, taskId);
            });
        }
    });
    //Xác nhận Task đã hoàn thành
    client.on('Confirm:Task(taskId, userId)', (taskId, userId, callback) => {
        let task = Task.getTaskById(taskId);
        let user = User.getUserById(userId);
        if (!task || !user) {
            callback('Task hoặc User không tồn tại');
        } else {
            realm.write(() => {
                let isUpdate = task.subscribers.some(subscriber => {
                    if (subscriber.id == user.id) {
                        subscriber.status = 2;
                        return true;
                    }
                    return false;
                });
                if (isUpdate) {
                    task.lastupdate = new Date();
                    callback(null, taskId);
                } else callback('Không tìm thấy Task');
            });
        }
    });
    //Edit một task
    client.on('Edit:Task(task)', (task, callback) => {
        if (!task) {
            callback('Task không tồn tại');
        } else {
            realm.write(() => {
                task.lastupdate = new Date();
                let newTask = realm.create('Task', task, true);
                callback(null, newTask);
            });
        }
    });
    //Create Task
    client.on('Create:Task(userId,projectId)', (userId, projectId, callback) => {
        let user = User.getUserById(userId);
        let project = Project.getProjectById(projectId);
        if (!user || !project) {
            callback('User hoặc Project không tồn tại');
        } else {
            realm.write(() => {
                realm.create('Task', {
                    id: Task.getNextTaskId(),
                    name: 'newTask',
                    createdate: moment().toDate(),
                    deadline: moment().add(1, 'week').toDate(),
                    status: 0,
                    assigned: user,
                    project: project,
                    lastupdate: new Date()
                });
            });
        }
    });
    // Show ra toàn bộ Subscribers Id mà Task có
    client.on('Get:Task.Subscribers(taskId)', (taskId, callback) => {
        let task = Task.getTaskById(taskId);
        if (!task) {
            callback('Task không tồn tại');
        } else {
            let subscribersId = [];
            task.subscribers.forEach(subscriber => {
                subscribersId.push(subscriber.id);
            });
            console.log(subscribersId);
            callback(null, subscribersId);
        }
    });
    // Trả về toàn bộ thông tin của Task
    client.on('Get:Task(taskId)', (taskId, callback) => {
        let task = Task.getTaskById(taskId);
        if (!task) {
            callback('Không tìm thấy Task');
        } else callback(null, task);
    });
};