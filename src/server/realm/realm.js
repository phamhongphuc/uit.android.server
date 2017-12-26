import Realm from 'realm';

let userSchema = {
    name: 'user',
    properties: {
        fbid: 'string',
        name: 'string'
    }
};

let appRealm = new Realm({
    path: 'src/database/app.realm',
    schema: [userSchema]
});

export default function (app) {
    app.realm = appRealm;
}