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
            app.realm.create('user', {
                fbid: '123',
                name: 'phúc'
            });
        });
        res.json({
            a: 1,
            b: 2
        });
    });
    app.get('/post', (req, res) => {
        res.json({
            db : app.realm.objects('user')
        });
    });
    app.get('*', (req, res) => {
        res.status(404).send('Not Found');
    });
}