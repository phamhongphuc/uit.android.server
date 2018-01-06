import moment from 'moment';
import Realm from 'realm';
import User from '../realm/User';
import Project from '../realm/Project';
import Message from '../realm/Message';
import Channel from '../realm/Channel';
import Task from '../realm/Task';
module.exports = function (app) {
    let realm = app.realm;

    // let message = realm.objects('Message').sorted('time', true).slice(0,3);
    // let channel = Channel.getChannelById(0);
    // let messs = channel.messages.sorted('time', true);
    // let temp2 = messs.findIndex(object => object.id == 888);
    // console.log(temp2);



    // let temp = channel.messages.sorted('time', true).findIndex(object => object.id == 2);
    // console.log(temp);
    // let mList = messs.slice(0, temp + 1);
    // console.log(mList);
    // let project = Project.getProjectById(3);
    // let user = User.getUserById(1);
    // let find = user.projectsOwn.find(o => o.id == 3);
    // let a = creator.projectsOwn.sorted('id',true);
    // let b = a.findIndex(o => o.id == 1);
    // console.log(find);
    let user = User.getUserById(1);
    let findTask = user.tasks.find(o=>o.id = 1);
    realm.write(() => {
        let temp = Project.getProjectById(4);
        console.log(temp);
        realm.delete(temp);
    });

    // Project.getProjectById(3).getJson();
};