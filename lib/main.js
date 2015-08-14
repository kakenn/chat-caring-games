var character = require('./character.js');
var quest = require('./quest.js');

exports.init = function(){
    character.init();
    quest.getQuestList();
}
exports.textChecker= function(channelId, text){
    var channel = slack.getChannelGroupOrDMByID(channelId);

    //slack.self.name
    if(text.match(/mame_test status/)){
        var value = character.getStatus()
        console.log(value);
        channel.send('レベル:' + value[0] + "\n経験値:"+value[1]);
    }

    if(text.match(/mame_test addEx [0-9]{1,4}/)){
        var levelup = character.addExperience(channel,200)
    }

    if(text.match(/mame_test goQuest/)) {
        channel.send('行ってくるﾜﾝ！');
        channel.send('1分後に帰ってくるﾜﾝ!!');
        quest.goQuest(60000, channel);
    }

    if(text.match(/mame_test questList/)) {
        var json_arr = quest.getQuestList();

        var send_msg = ">>>\n";

        json_arr.forEach(function (obj) {
            send_msg += "--------------------------------------\n";
            send_msg += "クエストID: " + obj.id + "\n";
            send_msg += "クエスト名: " + obj.name + "\n";
            send_msg += "内容: "  + obj.summary + "\n";
        });
        send_msg += "--------------------------------------\n";

        channel.send(send_msg);
    }
};