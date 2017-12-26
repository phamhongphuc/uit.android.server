import express from 'express';
import SocketIO from 'socket.io';
import moment from 'moment';
import http from 'http';
import chalk from 'chalk';

import AppExpress from './express/express';
import AppSocket from './socket/socket';
import AppConfig from './config/config';
import AppRealm from './realm/realm';

let app = express();
let port = process.env.PORT || 5;
let server = http.createServer(app);
let io = SocketIO(server);

console.log(chalk.bgMagenta(
    process.env.NODE_ENV == 'development' ?
        '\n ----- [ Development Environment ] ----- ' :
        '\n ----- [ Productions Environment ] ----- '
));

AppRealm(app);
AppConfig(app, io);
AppExpress(app);
AppSocket(io);

server.listen(port);

console.log(
    '   ' +
    chalk.underline.bgCyan(' http://ai.ai:' + port + ' - Lúc: ' + moment().format('hh:mm:ss') + ' ')
);