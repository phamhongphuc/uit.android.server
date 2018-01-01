import socketChannel from './socket.Channel';
import socketMessage from './socket.Message';
import socketProject from './socket.Project';
import socketTask from './socket.Task';
import socketUser from './socket.User';

import chalk from 'chalk';
// io là toàn bộ các máy con
// client là 1 máy con duy nhất

export default function (app, io) {
    let realm = app.realm;
    io.on('connection', (client) => {
        let sessionID = client.request.sessionID,
            socketID = client.id;
        // Mỗi thiết bị là 1 sessionID, 1 sessionID có thể có nhiều socketID
        console.log(chalk.bgBlueBright(`\n\n${socketID} in`));
        socketChannel(io, client, realm);
        socketMessage(io, client, realm);
        socketProject(io, client, realm);
        socketTask(io, client, realm);
        socketUser(io, client, realm);

        client.on('disconnect', () => {
            console.log(chalk.bgBlueBright(`${socketID} out`));
        });
    });
}