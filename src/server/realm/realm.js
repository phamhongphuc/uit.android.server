import Realm from 'realm';
import User from './User';

// let userSchema = {
//     name: 'user',
//     properties: {
//         fbid: 'string',
//         name: 'string'
//     }
// };

let appRealm = new Realm({
    path: 'src/database/app.realm',
    schema: [User]
});

export default function (app) {
    app.realm = appRealm;
}