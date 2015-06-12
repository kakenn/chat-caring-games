exports.textChecker= function(channelId, text){
    channel = slack.getChannelGroupOrDMByID(channelId);

    //slack.self.name
    if(text.match(/mame_test レベルアップ/)){
        co(function* (){
            res = yield database.getLevel();
            channel.send("レベルアップしたワン！" + res + "になったワン！");
        });
    }
}