module.exports = function (io, client, realm) {

    // Trả về toàn bộ thông tin của Channel
    client.on('Get:Channel(channelId)', (channelId, callback) => {
        let channel = getChannelById(channelId);
        if (channel == null) {
            callback('Không tìm thấy Channel');
        } else callback(null, channel);
    });

    function getChannelById(channelId) {
        return realm.objects('Channel').filtered('id == $0', channelId)[0];
    }
};