import socketUser from './socket.User';

// io là toàn bộ các máy con
// client là 1 máy con duy nhất

export default function (app, io) {
    let realm = app.realm;
    io.on('connection', (client) => {
        let sessionID = client.request.sessionID,
            socketID = client.id;
        // Mỗi thiết bị là 1 sessionID, 1 sessionID có thể có nhiều socketID
        console.log(`\n\n${socketID} - ${sessionID} in`);
        socketUser(io, client, realm);
        client.on('disconnect', () => {
            console.log(`${socketID} out`);
        });
    });
}