import fb from 'fb';

// io là toàn bộ các máy con
// client là 1 máy con duy nhất

export default function (io) {
    io.on('connection', (client) => {
        let sessionID = client.request.sessionID,
            socketID = client.id;
        // Mỗi thiết bị là 1 sessionID, 1 sessionID có thể có nhiều socketID
        console.log(`\n\n${socketID} - ${sessionID} in`);
        client.on('SetAccessToken', (data) => {
            // Khi người dùng phía client đăng nhập xong, họ sẽ gửi lên máy chủ một accessToken
            // Lưu cái đó vào trong cơ sở dữ liệu tạm thời
            console.log(data);
            fb.api('me', {
                fields: ['id', 'name'],
                access_token: data
            }, (res) => {
                console.log(res);
            });
        });
        client.on('disconnect', () => {
            console.log(`${socketID} out`);
        });
    });
}