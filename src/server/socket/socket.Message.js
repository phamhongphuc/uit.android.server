module.exports = function (io, client, realm) {

    // Trả về toàn bộ thông tin của Message
    client.on('Get:Message(messageId)', (messageId) => {
        let message = getMessageById(messageId);
        client.emit('Return Message', message);
    });

    function getMessageById(messageId) {
        return realm.objects('Message').filtered('id == $0', messageId)[0];
    }

};