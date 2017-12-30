import path from 'path';
// import moment from 'moment';

export default function (app) {
    app.get('/', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, '../../../dist/client/index.html')
        );
    });
    app.get('/add', (req, res) => {
        app.realm.write(()=>{
            app.realm.create('User', {
                fbid: '123',
                name: 'phúc'
            });
            res.json(u.fbid);
        });
    });
    app.get('/post', (req, res) => {
        res.json({
            db : app.realm.objects('User')
        });
    });
    app.get('*', (req, res) => {
        res.status(404).send('Not Found');
    });
}