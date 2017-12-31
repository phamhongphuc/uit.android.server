import fb from 'fb';

module.exports = function (io, client, realm) {
    client.on('GetUserByAccessToken', (accessToken) => {
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

    client.on('aJson', (data) => {
        console.log(data);
    });
    // Show ra toàn bộ tên project mà user đã tham gia
    client.on('ShowAllProject', (userId) => {
        let user = realm.objects('User').filtered('id == $0', userId)[0];
        let projectsName = [];
        user.projects.forEach(project => {
            projectsName.push(project.name);
        });
        console.log(projectsName);
    });

    // Trả về toàn bộ thông tin của user
    client.on('GetUser', (userId) => {
        let user = realm.objects('User').filtered('id==$0', userId)[0];
        client.emit('UserData', user);
    });
};