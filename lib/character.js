var database = require('./db.js');
var exTable = require('./exTable.json');
var status = {
    level:1,
    experience:0,
};
exports.init = function(){
    console.log('Character initing...')
    Promise.all([database.get('level'),database.get('experience')]).then(function(){
        status.level = nowStatus[0];
        status.experience = nowStatus[1];
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
        return true;
    }
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