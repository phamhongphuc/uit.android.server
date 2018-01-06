import Message from '../realm/Message';
import User from '../realm/User';
import Channel from '../realm/Channel';

module.exports = function (io, client, realm) {
    //New Message
    client.on('New:Message(channelId, userId, content)', (channelId, userId, content, callback = () => {}) => {
        let user = User.getUserById(userId);
        let channel = Channel.getChannelById(channelId);
        if (!user || !channel) {
            callback('User hoặc Channel không tồn tại');
        } else {
            realm.write(() => {
                let message = realm.create('Message', {
                    id: Message.getNextMessagelId(),
                    time: new Date(),
                    content: content
                });
                message.sender = user;
                message.channel = channel;
            });
            io.emit('New:Message.Return');
        }
    });

    //tải message lên khi client: size = 0
    client.on('Load.Message.Empty(channelId, number)', (channelId, number, callback = () => {}) => {
        let channel = Channel.getChannelById(channelId);
        if (!channel) {
            callback('Không tìm thấy channel');
        } else {
            let messageList = channel.messages;
            let mList = messageList.sorted('time', true).slice(0, number);
            // console.log(mList);
            callback(null, mList.getJson());
        }
    });

    // tải message từ messageId trở xuống
    client.on('Load:Message.MessId(channelId, messageId, number)', (channelId, messageId, number, callback = () => {}) => {
        let channel = Channel.getChannelById(channelId);
        if (!channel) {
            callback('Không tìn thấy channel');
        } else {
            let message = channel.messages.find(o => o.id == messageId);
            if (!message) {
                callback('Không tìm thấy MessageId trong Channel này');
            } else {
                let messages = channel.messages.sorted('time', true);
                let messageIndex = messages.findIndex(o => o.id == messageId);
                let messageList = messages.slice(0, messageIndex + 1);
                // console.log(messageList);
                callback(null, messageList.getJson());
            }
        }
    });

    // Trả về toàn bộ thông tin của Message
    client.on('Get:Message(messageId)', (messageId, callback = () => {}) => {
        let message = Message.getMessageById(messageId);
        if (message == null) {
            callback('Không tìm thấy Message');
        } else callback(null, message.getJson());
    });
};