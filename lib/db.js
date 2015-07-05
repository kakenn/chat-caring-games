var fileName = '../game.db';
var path = require('fs');
var db_Flag = path.existsSync(fileName);
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('../game.db');
console.log("run: "+process.cwd());



//データベースがあるかどうかを確認
var init = function(){
    //DBファイルがあるかどうか
    if(!db_Flag){
        console.log("db Initing....");

        //なければ初期データを作成
        db.serialize(function(){
            db.run("CREATE TABLE game_info (name TEXT, value TEXT)");
            db.run("INSERT INTO game_info VALUES ('level', '1')");
            db.run("INSERT INTO game_info VALUES ('experience', '0')");
        });

    }
};


exports.get = function(name){
    console.log('get:' + name);
    return new Promise(function(resolve) {
        var res = db.get("SELECT value FROM game_info WHERE name = '"+ name +"'", [], function(err, res){
            console.log(res.value);
            resolve(res.value);
        });
    });
};


exports.set = function(name, value){
    return new Promise(function(resolve) {
        var res = db.run("UPDATE game_info SET value = '"+ value +"' WHERE name = '"+ name +"'", []);
        db.commit();
        return true;
    });
};
init();