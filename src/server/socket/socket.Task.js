import moment from 'moment';
import User from '../realm/User';
import Task from '../realm/Task';
import Project from '../realm/Project';
import {
    callbackify
} from 'util';

module.exports = function (io, client, realm) {
    //Create Task
    client.on('Create:Task(projectId, userId)', (projectId, userId, callback) => {
        let project = Project.getProjectById(projectId);
        let user = User.getUserById(userId);
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

    //Subscriber Join một task
    client.on('Join:Task(taskId, userId)', (taskId, userId, callback) => {
        let task = Task.getTaskById(taskId);
        let user = User.getUserById(userId);
        if (!task || !user) {
            callback('Task hoặc User không tồn tại');
        } else {
            let find = user.tasks.find(o => o.id == task.id);
            if (!find) {
                realm.write(() => {
                    task.subscribers.push(user);
                    callback(null, taskId);
                });
            } else {
                callback('User đã tồn tại trong task, không thể thêm mới');
            }
        }
    });

    //Edit một task
    client.on('Edit:Task(task, userId)', (task, userId, callback) => {
        if (!task && !userId) {
            callback('Task hoặc User không tồn tại');
        } else {
            let user = User.getUserById(userId);
            let find = user.tasksOwn.find(o => o.id == task.id);
            if (!find) {
                callback('User không có quyền thao tác chức năng này');
            } else {
                realm.write(() => {
                    task.lastupdate = new Date();
                    let newTask = realm.create('Task', task, true);
                    callback(null, newTask);
                });
            }
        }
    });

    //Xác nhận Task đã hoàn thành
    client.on('Confirm:Task(taskId, userId)', (taskId, userId, callback) => {
        let task = Task.getTaskById(taskId);
        let user = User.getUserById(userId);
        if (!task || !user) {
            callback('Task hoặc User không tồn tại');
        } else {
            let find = user.tasks.find(o => o.id == task.id);
            if (!find) {
                callback('User không có quyền thao tác chức năng này');
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
        }
    });

    // Delete Task
    client.on('Delete:Task(taskId, userId)', (taskId, userId, callback) => {
        if (!taskId || !userId) {
            callback('Task hoặc User không tồn tại');
        } else {
            let user = User.getUserById(userId);
            let find = user.tasksOwn.find(o => o.id == taskId);
            if (!find) {
                callback('User không có quyền thao tác với chức năng này');
            } else {
                realm.write(() => {
                    let taskDelete = Task.getTaskById(taskId);
                    realm.delete(taskDelete);
                });
            }
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