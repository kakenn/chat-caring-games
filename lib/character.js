var database = require('./db.js');
var exTable = require('./exTable.json');
var status = {
    level:1,
    experience:0,
};

exports.getStatus = function(){
    console.log('getStatus');
    return Promise.all([database.get('level'),database.get('experience')]);
};

exports.addExperience = function(value){
    database.get('experience').then(function(ex){
        database.set('experience',Number(ex) + value);
    }, function(err){
        //TODO
        //エラー処理
    })
    return true;
};