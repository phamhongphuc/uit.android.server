module.exports = function (io, client, realm) {

    // Trả về toàn bộ thông tin của Channel
    client.on('Get:Channel(channelId)', (channelId) => {
        let channel = getChannelById(channelId);
        client.emit('Return Channel', channel);
    });

    function getChannelById(channelId) {
        return realm.objects('Channel').filtered('id == $0', channelId)[0];
    }
};