module.exports = function (io, client, realm) {
    //Trả về toàn bộ thông tin của một Task
    client.on('ChooseTask', (taskId) => {
        let task = realm.objects('Task').filtered('id==$0', {
            taskId
        })[0];
        client.emit('TaskData', task);
    });
    //
};