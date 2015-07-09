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
	var unsort_json_list = [];

	file_list.forEach(function (_file) {
		var file_path = _path + '/' + _file;

		if (path.extname(_file) === '.json') {
			var json = JSON.parse(fs.readFileSync(file_path));
			unsort_json_list.push(json);
		} else if (fs.lstatSync(file_path).isDirectory()) {
			var tmp_json_list = getJSONList(file_path);
			tmp_json_list.forEach(function (_json) {
				unsort_json_list.push(_json);
			});
		}
	});
	return sortJSONList(unsort_json_list);
}

var sortJSONList = function (_unsort_json_list) {
	var sort_json_list = [];

	_unsort_json_list.forEach(function (_us_json) {
		if (sort_json_list.length != 0) {
			var loop_exec_time = sort_json_list.length;

			for (var i = 0; i < loop_exec_time; i++) {
				if (sort_json_list[i].id > _us_json.id) {
					sort_json_list.splice(i, 0, _us_json);
					break;
				} else if (sort_json_list.length - 1 == i) {
					sort_json_list.push(_us_json);
				}
			}
		} else {
			sort_json_list.push(_us_json);
		}
	});
	return sort_json_list;
}