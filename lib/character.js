var database = require('./db.js');
var exTable = require('./exTable.json');
var status = {
    level : 0,
    experience : 0
};
exports.init = function(){
    console.log('Character initing...');
    syncStatus().then(function(nowStatus){
        status.level = Number(nowStatus[0]);
        status.experience = Number(nowStatus[1]);
        console.log(status);
    },function(err){
        console.log(err);
    });
}
exports.getStatus = function(){
    return [status.level,status.experience];
};

exports.addExperience = function(value){
    database.set('experience',status.experience + value);
    status.experience += + value;
    if(checkLevelup()){
        levelUp();
        console.log(status);
        return true;
    }
    console.log(status);
    return false;
};

var levelUp = function(){
    database.set('level',status.level + 1);
    status.level += 1;
    return true;
}

var checkLevelup = function(){
    return exTable[status.level] <= status.experience;
}

var syncStatus = function(){
    return Promise.all([database.get('level'),database.get('experience')]);
}