var Slack = require('slack-client');
var game = require('./lib/main.js');
//BOT_TOKEN


/*
    Setting
*/
var token = process.env.NODE_SLACK_TOKEN || "xxxx-0000000000-0000000000-0000000000-000000";
var autoReconnect = true;
var autoMark = true;

/*
    global系
*/

//スラック
slack = new Slack(token, autoReconnect, autoMark);




/*
    Slackのイベント
*/

//Slackとつながった時
slack.on('open',function(){
    //とりあえずBOTが入っているchannelを吐いてる
    for(var element in slack.channels){
        if(slack.channels[element].is_member == true){
            console.log(slack.channels[element].id + " : " + slack.channels[element].name);
        }
    }
    game.init();

});


//Slackでメッセージが送られてきた時
slack.on('message',function(message){

    //メッセージがあったchannelがBOTの入っているchannelかどうかを調べる
    for(var element in slack.channels){
        if(slack.channels[element].is_member == true){

            //自分の入っているchannelだった時にテキストをチェック
            game.textChecker(message.channel, message.text);
            break;
        }
    }
});

//なにかSlackとの通信でエラーが会った時
slack.on('error',function(error){
    console.log(error);
});

//スラックへログイン
slack.login();
