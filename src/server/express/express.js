import path from 'path';

export default function (app) {
    app.get('/', function (req, res) {
        res.sendFile(
            path.resolve(__dirname, '../../../dist/client/index.html')
        );
    });
    app.get('*', function (req, res) {
        res.status(404).send('Not Found');
    });
}