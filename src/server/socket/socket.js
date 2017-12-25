// import SocketIO from 'socket.io';
export default function (io) {
    io.on('connection', (client) => {
        let sessionID = client.request.sessionID,
            socketID = client.id;
        console.log(`${socketID} in`);

        client.on('foo', (data) => {
            io.emit('okay', {
                socketID: socketID,
                sessionID: sessionID,
                data: data
            });
            console.log({
                socketID: socketID,
                sessionID: sessionID,
                data: data
            });
        });

        client.on('disconnect', () => {
            console.log(`${socketID} out`);
        });
    });
}