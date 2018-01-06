import moment from 'moment';
import Channel from '../realm/Channel';
import Project from '../realm/Project';
import User from '../realm/User';

module.exports = function (io, client, realm) {
    //Create Channel
    client.on('Create:Channel(projectId, userId)', (projectId, userId, callback = () => {}) => {
        let project = Project.getProjectById(projectId);
        let user = User.getUserById(userId);
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
    client.on('Add:Channel.Members(channelId, userId)', (channelId, userId, callback = () => {}) => {
        let channel = Channel.getChannelById(channelId);
        let user = User.getUserById(userId);
        if (!channel || !user) {
            callback('Channel hoặc User không tồn tại');
        } else {
            let find = user.channels.find(o => o.id == channel.id);
            if (!find) {
                realm.write(() => {
                    channel.members.push(user);
                    callback(null, channelId);
                });
            } else {
                callback('User đã tồn tại trong channel, không thể thêm mới');
            }
        }
    });

    //Edit một Channel
    client.on('Edit:Channel(channel, userId)', (channel, userId, callback = () => {}) => {
        if (!channel && !userId) {
            callback('Channel hoặc User không tồn tại');
        } else {
            let user = User.getUserById(userId);
            let find = user.channelsOwn.find(o => o.id == channel.id);
            if (!find) {
                callback('User không có quyền thao tác chức năng này');
            } else {
                realm.write(() => {
                    channel.lastupdate = new Date();
                    let newChannel = realm.create('Channel', channel, true);
                    callback(null, newChannel);
                });
            }
        }
    });

    // Delete Task
    client.on('Delete:Channel(channelId, userId)', (channelId, userId, callback = () => {}) => {
        if (!channelId || !userId) {
            callback('Channel hoặc User không tồn tại');
        } else {
            let user = User.getUserById(userId);
            let find = user.channelsOwn.find(o => o.id == channelId);
            if (!find) {
                callback('User không có quyền thao tác với chức năng này');
            } else {
                realm.write(() => {
                    let channelDelete = Channel.getChannelById(channelId);
                    realm.delete(channelDelete);
                });
            }
        }
    });

    // Trả về toàn bộ thông tin của Channel
    client.on('Get:Channel(channelId)', (channelId, callback = () => {}) => {
        let channel = Channel.getChannelById(channelId);
        if (channel == null) {
            callback('Không tìm thấy Channel');
        } else callback(null, channel);
    });
};