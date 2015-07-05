var database = require('./db.js');
var exTable = require('./exTable.json');
var status = {
    level:1,
    experience:0,
};
exports.init = function(){
    nowStatus = Promise.all([database.get('level'),database.get('experience')]);
    status.level = nowStatus[0];
    status.experience = nowStatus[1];
}
exports.getStatus = function(){
    return [status.level,status.experience];
};

exports.addExperience = function(value){
    database.get('experience').then(function(ex){
        database.set('experience',Number(ex) + value);
        status.experience = Number(ex) + value;
    }, function(err){
        //TODO
        //エラー処理
    })
    return true;
};

exports.levelUp = function(){
    database.set('level',status.level + 1);
    status.level += 1;
    return true;
}