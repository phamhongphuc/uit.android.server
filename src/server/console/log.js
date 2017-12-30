module.exports = function (app) {



    let a = app.realm.objects('User').filtered('id == $0', '891448197630355');
    console.log(a[0].projects);






    
};