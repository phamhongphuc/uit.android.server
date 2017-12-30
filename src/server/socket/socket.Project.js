module.exports = function (io, client, realm) {
    client.on('ProjectStatus', (userId) => {
        realm.objects('User').filtered('id == $0', userId);
    });
};