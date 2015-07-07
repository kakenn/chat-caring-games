var fs = require('fs');
var path = require('path');
var cronJob = require('cron').CronJob;

exports.goQuest = function (necessary_ms, channel) {

	var completion_time = Date.now() + necessary_ms;

	var job = new cronJob({
		cronTime: new Date(completion_time),
		onTick: function () {
			returnFromQuest(channel);
		},
		start: false
	});

	job.start();
}

var returnFromQuest = function (channel) {
	channel.send('ただいまﾜﾝ!!');
}

exports.getQuestList = function () {
	var json_arr = [];
	var file_list = fs.readdirSync('quest_file/');

	file_list.forEach(function (file) {
		if (path.extname(file) === '.json') {
			var json = JSON.parse(fs.readFileSync('quest_file/' + file));
			json_arr.push(json);
		}
	});
	return json_arr;
}