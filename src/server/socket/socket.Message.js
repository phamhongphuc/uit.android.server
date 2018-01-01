module.exports = function (io, client, realm) {

    // Trả về toàn bộ thông tin của Message
    client.on('Get:Message(messageId)', (messageId, callback) => {
        let message = getMessageById(messageId);
        callback(null, message);
    });

    function getMessageById(messageId) {
        return realm.objects('Message').filtered('id == $0', messageId)[0];
    }

};