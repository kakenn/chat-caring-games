var fileName = process.cwd() + '/game.db';
var path = require('fs');
var db_Flag = path.existsSync(fileName);
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database(fileName);
console.log("run: "+db_Flag);



var init = function(){
    if(!db_Flag){
        db.serialize(function(){
            db.run("CREATE TABLE game_info (name TEXT, value TEXT)");
            db.run("INSERT INTO game_info VALUES ('level', '1')");
        });
        console.log("init");
    }
};

exports.getLevel = function(){
    var res = db.get("SELECT value FROM game_info WHERE name = 'level'");
    console.log(res);
    return res;
};
init();