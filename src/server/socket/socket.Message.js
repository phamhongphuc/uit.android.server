import moment from 'moment';
import Message from '../realm/Message';
import User from '../realm/User';
import Channel from '../realm/Channel';

module.exports = function (io, client, realm) {
    // Trả về toàn bộ thông tin của Message
    client.on('Get:Message(messageId)', (messageId, callback) => {
        let message = Message.getMessageById(messageId);
        if (message == null) {
            callback('Không tìm thấy Message');
        } else callback(null, message);
    });
    //New Message
    client.on('New:Message(channelId, userId, content)', (channelId, userId, content, callback) => {
        let user = User.getUserById(userId);
        let channel = Channel.getChannelById(channelId);
        if (!user || !channel) {
            callback('User hoặc Channel không tồn tại');
        } else {
            realm.write(() => {
                let message = realm.create('Message', {
                    id: Channel.getNextMessagelId(),
                    time: new Date(),
                    content: content
                });
                message.sender = user;
                message.idchannel = channel;
            });
        }
    });
    //list Mess
    client.on('List.Mess(channelId'), (channelId, callback) => {
        let channel = Channel.getChannelById(channelId);

    };
};