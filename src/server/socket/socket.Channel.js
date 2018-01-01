import Channel from '../realm/Channel';
module.exports = function (io, client, realm) {
    // Trả về toàn bộ thông tin của Channel
    client.on('Get:Channel(channelId)', (channelId, callback) => {
        let channel = Channel.getChannelById(channelId);
        if (channel == null) {
            callback('Không tìm thấy Channel');
        } else callback(null, channel);
    });
};