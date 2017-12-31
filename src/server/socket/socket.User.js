import fb from 'fb';

module.exports = function (io, client, realm) {
    client.on('Get:User(accessToken)', (accessToken) => {
        // data là chuỗi AccessToken
        // Khi người dùng phía client đăng nhập xong, họ sẽ gửi lên máy chủ một accessToken
        // Lưu cái đó vào trong cơ sở dữ liệu tạm thời
        console.log(accessToken);
        fb.api('me', {
            fields: ['id', 'name', 'email'],
            access_token: accessToken
        }, (res) => {
            // Kiểm tra tính đúng đắn res
            // Khi đã nhận được id, name, dùng 2 trường dữ liệu đó để lưu vào csdl
            if (!res || res.error) {
                client.emit('LoginStatus', {
                    error: 'Đăng nhập không thành công'
                });
            } else {
                realm.write(() => {
                    // Vừa ghi đè, vừa lấy ra thông tin
                    let user = realm.create('User', {
                        id: res.id,
                        name: res.name,
                        email: res.email
                    }, true);
                    console.log('Emit to Client', user);
                    client.emit('UserData', res);
                });
            }
            console.log(res);
        });
    });

    // Show ra toàn bộ Project Id mà user đã tham gia
    client.on('Get:User.Projects(userId)', (userId) => {
        let user = getUserById(userId);
        let projectsID = [];
        user.projects.forEach(project => {
            projectsID.push(project.id);
        });
        console.log(projectsID);
        client.emit('Return Project ID', projectsID);
    });

    //Edit một User
    client.on('Edit:User(user)', (user) => {
        realm.write(() => {
            let newUser = realm.create('User', user, true);
            client.emit('Edit a Successful User', newUser);
        });
    });

    // Trả về toàn bộ thông tin của user
    client.on('Get:User(userId)', (userId) => {
        let user = getUserById(userId);
        client.emit('Return User', user);
    });

    function getUserById(userId) {
        return realm.objects('User').filtered('id == $0', userId)[0];
    }
};