var Slack = require('slack-client');

//BOT_TOKEN
var token = process.env.NODE_SLACK_TOKEN || "xxxx-0000000000-0000000000-0000000000-000000";
var autoReconnect = true;
var autoMark = true;

var slack = new Slack(token, autoReconnect, autoMark);

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
            testTextChecker(message.channel, message.text);
            break;
        }
    }
});

slack.on('error',function(error){
    console.log(error);
});

function testTextChecker(channelId, text){
    channel = slack.getChannelGroupOrDMByID(channelId);

    //slack.self.name
    if(text.match(/mame_test レベルアップ/)){
        channel.send("レベルアップしたワン！");
    }
}
slack.login();