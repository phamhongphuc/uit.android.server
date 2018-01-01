import Message from '../realm/Message';
module.exports = function (io, client, realm) {
    // Trả về toàn bộ thông tin của Message
    client.on('Get:Message(messageId)', (messageId, callback) => {
        let message = Message.getMessageById(messageId);
        if (message == null) {
            callback('Không tìm thấy Message');
        } else callback(null, message);
    });

};