import fb from 'fb';
import User from '../realm/User';

module.exports = function (io, client, realm) {
    // realm.objects('User').addListener((puppies, changes) => {
    //     // console.log('User: puppies:', puppies);
    //     // console.log('User: changes:', changes);
    //     changes.modifications.forEach((index) => {
    //         let modifiedUser = puppies[index];
    //         // console.log(modifiedUser.getJson());
    //         console.log('có sự thay đổi của user', puppies);
    //         io.emit('Update:User', modifiedUser.getJson());
    //     });
    // });

    client.on('Get:User(accessToken)', (accessToken, callback = () => {}) => {
        // data là chuỗi AccessToken
        console.log(`\nGet:User(accessToken = ${accessToken.substring(0, 10)}...)`);
        fb.api('me', {
            fields: ['id', 'name', 'email'],
            access_token: accessToken
        }, (res) => {
            if (!res || res.error) {
                callback('accessToken không đúng hoặc máy chủ không thể kết nối tới Facebook');
            } else {
                realm.write(() => {
                    // Vừa ghi đè, vừa lấy ra thông tin
                    let user = User.getUserById(res.id);
                    if (user == null || user.name !== res.name || user.email !== res.email) {
                        user = realm.create('User', {
                            id: res.id,
                            name: res.name,
                            email: res.email,
                            lastupdate: new Date()
                        }, true);
                    }
                    console.log(`  => return user: ${res.id} - ${res.name}`);
                    callback(null, user.getJson());
                });
            }
        });
    });

    //Edit một User
    client.on('Edit:User(user)', (user, callback = () => {}) => {
        if (!user) {
            callback('User không tồn tại');
        } else {
            realm.write(() => {
                user.lastupdate = new Date();
                let newUser = realm.create('User', user, true);
                callback(null, newUser);
            });
        }
    });

    // Trả về toàn bộ thông tin của user
    client.on('Get:User(userId)', (userId, callback = () => {}) => {
        let user = User.getUserById(userId);
        if (!user) {
            callback('Không tìm thấy User');
        } else callback(null, user.getJson());
    });
};