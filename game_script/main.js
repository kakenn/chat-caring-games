var character = require('./character.js');

exports.textChecker= function(channelId, text){
    channel = slack.getChannelGroupOrDMByID(channelId);

    //slack.self.name
    if(text.match(/mame_test status/)){
        co(function* (){
            var status = yield character.getStatus();
            channel.send('レベル:' + status.level + "\n経験値:"+status.experience);
        });
    }
};