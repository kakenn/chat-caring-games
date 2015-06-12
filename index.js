var Slack = require('slack-client');
var game = require('./game_script/main.js');
database = require('./game_script/db.js');
//BOT_TOKEN
var token = process.env.NODE_SLACK_TOKEN || "xxxx-0000000000-0000000000-0000000000-000000";
var autoReconnect = true;
var autoMark = true;

//global
slack = new Slack(token, autoReconnect, autoMark);





slack.on('open',function(){

    for(var element in slack.channels){
        if(slack.channels[element].is_member == true){
            console.log(slack.channels[element].id + " : " + slack.channels[element].name);
            //break;
        }
    }
});

slack.on('message',function(message){

    for(var element in slack.channels){
        if(slack.channels[element].is_member == true && message.channel){
            game.textChecker(message.channel, message.text);
            break;
        }
    }
});

slack.on('error',function(error){
    console.log(error);
});


slack.login();
