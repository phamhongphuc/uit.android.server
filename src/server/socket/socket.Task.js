import moment from 'moment';
import User from '../realm/User';
import Task from '../realm/Task';
import Project from '../realm/Project';
import {
    callbackify
} from 'util';

module.exports = function (io, client, realm) {
    //Create Task
    client.on('Create:Task(projectId, userId)', (projectId, userId, callback = () => {}) => {
        console.log('\nCreate:Task(projectId, userId)');
        let project = Project.getProjectById(projectId);
        let user = User.getUserById(userId);
        if (!user || !project) {
            console.log('  => Lỗi');
            callback('User hoặc Project không tồn tại');
        } else {
            realm.write(() => {
                let task = realm.create('Task', {
                    id: Task.getNextTaskId(),
                    name: 'newTask',
                    description: 'Mô tả',
                    status: 0,

                    createdate: moment().toDate(),
                    deadline: moment().add(1, 'week').toDate(),
                    lastupdate: new Date(),

                    assigned: user,
                    subscribers: [user],
                    project: project,
                });
                callback(null, task.getJson());
                console.log('  => return Create:Task(projectId, userId)');
            });
        }
    });

    //Subscriber Join một task
    client.on('Join:Task(taskId, userId)', (taskId, userId, callback = () => {}) => {
        let task = Task.getTaskById(taskId);
        let user = User.getUserById(userId);
        if (!task || !user) {
            callback('Task hoặc User không tồn tại');
        } else {
            let find = user.tasks.find(o => o.id == task.id);
            if (!find) {
                realm.write(() => {
                    task.subscribers.push(user);
                    let taskJson = task.getJson();
                    taskJson.subscribers = task.getMember();
                    callback(null, taskJson);
                });
            } else {
                callback('User đã tồn tại trong task, không thể thêm mới');
            }
        }
    });

    //Edit một task
    client.on('Edit:Task(task, userId)', (task, userId, callback = () => {}) => {
        if (!task && !userId) {
            callback('Task hoặc User không tồn tại');
        } else {
            let user = User.getUserById(userId);
            let find = user.tasksOwn.find(o => o.id == task.id);
            if (!find) {
                callback('User không có quyền thao tác chức năng này');
            } else {
                realm.write(() => {
                    let newTask = realm.create('Task', task, true);
                    let taskJson = newTask.getJson();
                    taskJson.assigned = newTask.assigned.getJson();
                    taskJson.subscribers = newTask.subscribers.map(
                        user => user.getJson()
                    );
                    taskJson.project = newTask.project.getJson();
                    callback(null, taskJson);
                });
            }
        }
    });

    //Xác nhận Task đã hoàn thành
    client.on('Confirm:Task(taskId, userId)', (taskId, userId, callback = () => {}) => {
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
                            callback(null, 'Xác nhận Task thành công');
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
    client.on('Delete:Task(taskId, userId)', (taskId, userId, callback = () => {}) => {
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
                    callback(null, 'Xóa thành công');
                });
            }
        }
    });

    // Trả về assigned Id tạo Task
    client.on('Get:Task.assigned(taskId)', (taskId, callback = () => {}) => {
        let task = Task.getTaskById(taskId);
        if (!task) {
            callback('Không tìm thấy Task');
        } else callback(null, task.assigned.map(user => user.id));
    });

    // Trả về toàn bộ subscribers Id đang tham gia Task
    client.on('Get:Task.subscribers(taskId)', (taskId, callback = () => {}) => {
        let task = Task.getTaskById(taskId);
        if (!task) {
            callback('Không tìm thấy Task');
        } else callback(null, task.subscribers.map(user => user.id));
    });

    // Trả về toàn bộ thông tin của Task
    client.on('Get:Task(taskId)', (taskId, callback = () => {}) => {
        let task = Task.getTaskById(taskId);
        if (!task) {
            callback('Không tìm thấy Task');
        } else callback(null, task.getJon());
    });
};