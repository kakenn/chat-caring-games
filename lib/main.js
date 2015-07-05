var character = require('./character.js');

exports.init = function(){
    character.init();
}
exports.textChecker= function(channelId, text){
    channel = slack.getChannelGroupOrDMByID(channelId);

    //slack.self.name
    if(text.match(/mame_test status/)){
        value = character.getStatus()
        console.log(value);
        channel.send('レベル:' + value[0] + "\n経験値:"+value[1]);
    }
    if(text.match(/mame_test addEx [0-9]{1,4}/)){
        var levelup = character.addExperience(200)
        channel.send('経験値を 200獲得したﾜﾝ！');
        if(levelup) channel.send('レベルアップしたﾜﾝ!');
    }
};