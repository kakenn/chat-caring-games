var database = require('./db.js');
var status = {
    level:1,
    experience:0,
};

exports.getStatus = function(){
    return new Promise(function(resolve) {
        database.getStatus().then(function(val){
            status = val;
            resolve(status);
        });
    });
};