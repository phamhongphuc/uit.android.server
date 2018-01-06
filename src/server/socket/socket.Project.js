import moment from 'moment';
import Project from '../realm/Project';
import User from '../realm/User';

module.exports = function (io, client, realm) {
    // realm.objects('Project').addListener((puppies, changes) => {
    //     // console.log('Project', puppies, changes);
    // });

    //Create Project
    client.on('Create:Project(userId)', (userId, callback = () => {}) => {
        console.log(`\nCreate:Project(userId = ${userId})`);
        let user = User.getUserById(userId);
        if (!user) {
            callback('User không tồn tại');
        } else {
            realm.write(() => {
                let project = realm.create('Project', {
                    id: Project.getNextProjectId(),
                    name: 'Dự án mới',
                    creator: user,
                    description: 'Điền chú thích của dự án vào đây',
                    createdate: moment().toDate(),
                    deadline: moment().add(1, 'week').toDate(),
                    lastupdate: new Date()
                });
                project.creator = user;
                project.members.push(user);
                user.lastupdate = new Date();
                console.log(`  => return project: project.id = ${project.id}`);
                callback(null, project.getJson());
            });
        }
    });

    //Thêm một thành viên vào Project
    client.on('Add:Project.Member(projectId, userId)', (projectId, userId, callback = () => {}) => {
        let project = Project.getProjectById(projectId);
        let user = User.getUserById(userId);
        if (!project || !user) {
            callback('Project hoặc User không tồn tại');
        } else {
            let find = user.projects.find(o => o.id == project.id);
            if (!find) {
                realm.write(() => {
                    project.members.push(user);
                    callback(null, projectId);
                });
            } else {
                callback('User đã tồn tại trong Project, không thể thêm mới');
            }
        }
    });

    //Edit một Project
    client.on('Edit:Project(project, userId)', (project, userId, callback = () => {}) => {
        if (!project || !userId) {
            callback('Project hoặc User không tồn tại');
        } else {
            let user = User.getUserById(userId);
            let find = user.projectsOwn.find(o => o.id == project.id);
            if (!find) {
                callback('User không có quyền thao tác chức năng này');
            } else {
                realm.write(() => {
                    project.lastupdate = new Date();
                    let newProject = realm.create('Project', project, true);
                    callback(null, newProject);
                });
            }
        }
    });

    // Delete Project
    client.on('Delete:Project(projectId, userId)', (projectId, userId, callback = () => {}) => {
        if (!projectId || !userId) {
            callback('Project hoặc User không tồn tại');
        } else {
            let user = User.getUserById(userId);
            let find = user.projectsOwn.find(o => o.id == projectId);
            if (!find) {
                callback('User không có quyền thao tác với chức năng này');
            } else {
                realm.write(() => {
                    let projectDelete = Project.getProjectById(projectId);
                    realm.delete(projectDelete);
                });
            }
        }
    });

    // Trả về toàn bộ Task Id mà project
    client.on('Get:Project.tasks(projectId)', (projectId, callback = () => {}) => {
        let project = Project.getProjectById(projectId);
        if (!project) {
            callback('Không tìm thấy Project');
        } else callback(null, project.tasks.map(task => task.id));
    });

    // // Show ra toàn bộ Task Id mà Project có
    // client.on('Get:Project.Tasks(projectId)', (projectId, callback = () => {}) => {
    //     let project = Project.getProjectById(projectId);
    //     if (!project) {
    //         callback('Project không tồn tại');
    //     } else {
    //         let tasksId = [];
    //         project.tasks.forEach(task => {
    //             tasksId.push(task.id);
    //         });
    //         console.log(tasksId);
    //         callback(null, tasksId);
    //     }
    // });

    // Trả về toàn bộ Channel Id mà Project có
    client.on('Get:Project.channels(projectId)', (projectId, callback = () => {}) => {
        let project = Project.getProjectById(projectId);
        if (!project) {
            callback('Không tìm thấy Project');
        } else callback(null, project.channels.map(channel => channel.id));
    });

    // // Show ra toàn bộ Channel Id mà Project có
    // client.on('Get:Project.Channels(projectId)', (projectId, callback = () => {}) => {
    //     let project = Project.getProjectById(projectId);
    //     if (!project) {
    //         callback('Project không tồn tại');
    //     } else {
    //         let channelsId = [];
    //         project.channels.forEach(channel => {
    //             channelsId.push(channel.id);
    //         });
    //         console.log(channelsId);
    //         callback(null, channelsId);
    //     }
    // });

    // Trả về User Id tạo Project
    client.on('Get:Project.creator(projectId)', (projectId, callback = () => {}) => {
        let project = Project.getProjectById(projectId);
        if (!project) {
            callback('Không tìm thấy Project');
        } else callback(null, project.creator.map(user => user.id));
    });

    // Trả về toàn bộ Member Id đang tham gia Project
    client.on('Get:Project.members(projectId)', (projectId, callback = () => {}) => {
        let project = Project.getProjectById(projectId);
        if (!project) {
            callback('Không tìm thấy Project');
        } else callback(null, project.members.map(user => user.id));
    });

    // // Show ra toàn bộ Member Id mà Project có
    // client.on('Get:Project.Members(projectId)', (projectId, callback = () => {}) => {
    //     let project = Project.getProjectById(projectId);
    //     if (!project) {
    //         callback('Project không tồn tại');
    //     } else {
    //         let membersId = [];
    //         project.member.forEach(member => {
    //             membersId.push(member.id);
    //         });
    //         // console.log(membersId);
    //         callback(null, membersId);
    //     }
    // });

    // Trả về toàn bộ thông tin của Project
    client.on('Get:Project(projectId)', (projectId, callback = () => {}) => {
        console.log(`\nGet:Project(projectId = ${projectId})`);
        let project = Project.getProjectById(projectId);
        if (!project) {
            callback('Không tìm thấy Project');
        } else {
            console.log(`  => project.id = ${project.id}`);
            callback(null, project.getJson());
        }
    });

    // // Show ra toàn bộ Project Id mà user đã tham gia
    // client.on('Get:Projects(userId)', (userId, callback = () => {}) => {
    //     console.log(`\nGet:Projects(userId = ${userId})`);
    //     let user = User.getUserById(userId);
    //     if (!user) {
    //         callback('User không tồn tại');
    //     } else {
    //         let projectsID = [];
    //         user.projects.forEach(project => {
    //             projectsID.push(project.id);
    //         });
    //         console.log(projectsID);
    //         console.log(`  => return projectsId[].length = ${projectsID.length}`);
    //         // console.log(user.projects);
    //         // callback(null, projectsID);
    //     }
    // });
};