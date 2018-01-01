import Realm from 'realm';
import Channel from './Channel';
import Message from './Message';
import Project from './Project';
import Task from './Task';
import User from './User';

let schemas = [Channel, Message, Project, Task, User];
let realm = new Realm({
    path: 'src/database/app.realm',
    schema: schemas
});

schemas.forEach(schema => {
    schema.setRealm(realm);
});

export default function (app) {
    app.realm = realm;
}