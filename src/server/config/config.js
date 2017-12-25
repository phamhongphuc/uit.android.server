import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import appConfigClient from './config.client';

// import webpackDevelopment from './express.dev';

export default function (app, io) {
    let sessionConfig = session({
        name: 'net.aivn',
        secret: 'Mã bảo mật session ở máy chủ',
        resave: false,
        saveUninitialized: true,
        cookie: {
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: null
        }
    });
    io.use((socket, next) => {
        sessionConfig(socket.request, socket.request.res, next);
    });
    app.use(sessionConfig);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    appConfigClient(app);
}