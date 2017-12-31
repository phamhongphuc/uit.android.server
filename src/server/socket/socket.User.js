import fb from 'fb';

module.exports = function (io, client, realm) {
    client.on('SetAccessToken', (accessToken) => {
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
                    realm.create('User', {
                        id: res.id,
                        name: res.name,
                        email: res.email
                    }, true);
                    client.emit('Login', res);
                });
            }
            console.log(res);
        });
    });
    client.on('ShowAllProject', (user) => {
        let projectsName = [];
        user.projects.forEach(project => {
            projectsName.push(project.name);
        });
        console.log(projectsName);
    });
};