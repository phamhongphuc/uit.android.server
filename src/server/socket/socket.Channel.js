import moment from 'moment';
import Channel from '../realm/Channel';
import Project from '../realm/Project';
import User from '../realm/User';

module.exports = function (io, client, realm) {
    // Trả về toàn bộ thông tin của Channel
    client.on('Get:Channel(channelId)', (channelId, callback) => {
        let channel = Channel.getChannelById(channelId);
        if (channel == null) {
            callback('Không tìm thấy Channel');
        } else callback(null, channel);
    });
    //Create Channel
    client.on('Create:Channel(userId, projectId)', (userId, projectId, callback) => {
        let user = User.getUserById(userId);
        let project = Project.getProjectById(projectId);
        if (!user || !project) {
            callback('User hoặc Project không tồn tại');
        } else {
            realm.write(() => {
                let channel = realm.create('Channel', {
                    id: Channel.getNextChannelId(),
                    name: 'newChannel',
                    createdate: moment().toDate()
                });
                channel.assigned = user;
                channel.members.push(user);
                channel.project = project;
                channel.lastupdate = new Date();
            });
        }
    });
    //Thêm một thành viên vào Channel
    client.on('Add:Channel.Members(channelId, userId)', (channelId, userId, callback) => {
        let channel = Channel.getChannelById(channelId);
        let user = User.getUserById(userId);
        if (!channel || !user) {
            callback('Channel hoặc User không tồn tại');
        } else {
            realm.write(() => {
                channel.members.push(user);
                callback(null, channelId);
            });
        }
    });
    //Edit một Channel
    client.on('Edit:Channel(channel)', (channel, callback) => {
        if (!channel) {
            callback('Channel không tồn tại');
        } else {
            realm.write(() => {
                channel.lastupdate = new Date();
                let newChannel = realm.create('Channel', channel, true);
                callback(null, newChannel);
            });
        }
    });

};