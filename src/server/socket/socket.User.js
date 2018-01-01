import fb from 'fb';
import User from '../realm/User';

module.exports = function (io, client, realm) {
    client.on('Get:User(accessToken, id)', (accessToken, id, callback) => {
        // data là chuỗi AccessToken
        // console.log(accessToken, id, callback);
        fb.api('me', {
            fields: ['id', 'name', 'email'],
            access_token: accessToken
        }, (res) => {
            // Kiểm tra tính đúng đắn res
            // Khi đã nhận được id, name, dùng 2 trường dữ liệu đó để lưu vào csdl
            if (!res || res.error) {
                callback('accessToken không đúng hoặc máy chủ không thể kết nối tới Facebook');
            } else {
                realm.write(() => {
                    // Vừa ghi đè, vừa lấy ra thông tin
                    let user = realm.create('User', {
                        id: res.id,
                        name: res.name,
                        email: res.email,
                        lastupdate: new Date()
                    }, true);
                    // user.projects = [];
                    callback(null, user);
                    console.log(user);
                });
            }
        });
    });

    // Show ra toàn bộ Project Id mà user đã tham gia
    client.on('Get:User.Projects(userId)', (userId, callback) => {
        let user = User.getUserById(userId);
        if (!user) {
            callback('User không tồn tại');
        } else {
            let projectsID = [];
            user.projects.forEach(project => {
                projectsID.push(project.id);
            });
            console.log(projectsID);
            callback(null, projectsID);
        }
    });

    //Edit một User
    client.on('Edit:User(user)', (user, callback) => {
        if (!user) {
            callback('User không tồn tại');
        } else {
            realm.write(() => {
                user.lastupdate = new Date();
                let newUser = realm.create('User', user, true);
                callback(null, newUser);
            });
        }
    });

    // Trả về toàn bộ thông tin của user
    client.on('Get:User(userId)', (userId, callback) => {
        let user = User.getUserById(userId);
        if (!user) {
            callback('Không tìm thấy User');
        } else callback(null, user);
    });
};