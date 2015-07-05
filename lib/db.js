var fileName = process.cwd() + '/game.db';
var path = require('fs');
var db_Flag = path.existsSync(fileName);
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database(fileName);
console.log("run: "+db_Flag);



//データベースがあるかどうかを確認
var init = function(){

    //DBファイルがあるかどうか
    if(!db_Flag){

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
            resolve(res.value);
        });
    });
};


exports.set = function(name, value){
    return new Promise(function(resolve) {
        var res = db.run("UPDATE game_info SET value = '"+ value +"' WHERE name = '"+ name +"'", []);
        return true;
    });
};
init();