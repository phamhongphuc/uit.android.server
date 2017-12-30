import path from 'path';
// import moment from 'moment';

export default function (app) {
    app.get('/', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, '../../../dist/client/index.html')
        );
    });
    app.get('/add', (req, res) => {
        app.realm.write(() => {
            const u = app.realm.create('user', {
                fbid: '123efhjhg',
                name: 'phúcsdfsd fs'
            });
            res.json(u.fbid);
        });
    });
    app.get('/post', (req, res) => {
        res.json({
            users: app.realm.objects('user')
        });
    });
    app.get('*', (req, res) => {
        res.status(404).send('Not Found');
    });
}