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
	return getJSONList('quest_file');
}

var getJSONList = function (_path) {
	var file_list = fs.readdirSync(_path);
	var json_list = [];

	file_list.forEach(function (_file) {
		var file_path = _path + '/' + _file;

		if (path.extname(_file) === '.json') {
			var json = JSON.parse(fs.readFileSync(file_path));
			json_list.push(json);
		} else if (fs.lstatSync(file_path).isDirectory()) {
			var tmp_json_list = getJSONList(file_path);
			tmp_json_list.forEach(function (_json) {
				json_list.push(_json);
			});
		}
	});

	json_list.sort(function (a, b) {
		return a.id > b.id ? 1 : -1;
	});
	return json_list;
}

var getJSONFileById = function (_target_id) {
	var json_list = getJSONList('quest_file');

	for (var i = 0; i < json_list.length; i++) {
		if (json_list[i].id == _target_id) {
			return json_list[i];
		}
	}
	return false;
}