var database = require('./db.js');
var exTable = require('./exTable.json');
var status = {
    level : 0,
    experience : 0
};
exports.init = function(){
    console.log('Character init...');
    syncStatus().then( nowStatus => {
        status.level = Number(nowStatus[0]);
        status.experience = Number(nowStatus[1]);
        console.log(status);
    },function(err){
        console.log(err);
    });
};
exports.getStatus = function(){
    return [status.level,status.experience];
};

exports.addExperience = (channel,value) => {
    database.set('experience',status.experience + value);
    status.experience += + value;
    channel.send(`経験値を${value}獲得したﾜﾝ！`);
    if(checkLevelup()){
        levelUp();
        channel.send(`レベルアップしたﾜﾝ！`);
        channel.send(`レベルが${status.level}になったﾜﾝ！`);
        return true;
    }
    return false;
};

var levelUp = () => {
    database.set('level',status.level + 1);
    status.level += 1;
    return true;
};

var checkLevelup = () => {
    return exTable[status.level] <= status.experience;
};

var syncStatus = () => {
    return Promise.all([database.get('level'),database.get('experience')]);
};