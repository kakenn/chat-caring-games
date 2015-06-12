exports.textChecker= function(channelId, text){
    channel = slack.getChannelGroupOrDMByID(channelId);

    //slack.self.name
    if(text.match(/mame_test レベルアップ/)){
        channel.send("レベルアップしたワン！" + database.getLevel() + "になったワン！");
    }
}