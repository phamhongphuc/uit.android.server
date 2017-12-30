import Realm from 'realm';
import Channel from './Channel';
import Message from './Message';
import Project from './Project';
import Task from './Task';
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
    schema: [Channel, Message, Project, Task, User]
});

export default function (app) {
    app.realm = appRealm;
}