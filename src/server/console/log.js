import moment from 'moment';
import Realm from 'realm';
import User from '../realm/User';
import Project from '../realm/Project';
module.exports = function (app) {
    let realm = app.realm;

    let message = realm.objects('Message').find(object => object.id == 1);

    console.log(message);
    // Project.getProjectById(3).getJson();
};