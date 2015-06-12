exports.textChecker= function(channelId, text){
    channel = slack.getChannelGroupOrDMByID(channelId);

    //slack.self.name
    if(text.match(/mame_test レベルアップ/)){
        database.getLevel().then(function(val){
            channel.send("レベルアップしたワン！" + val + "になったワン！");
        });
    }
}