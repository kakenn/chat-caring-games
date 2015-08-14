var fs = require('fs');
var path = require('path');
var cronJob = require('cron').CronJob;

var character = require('./character.js');
var is_going_quest = false;


exports.goQuest = (_quest_id, _channel) => {

	if (is_going_quest == true) {
		_channel.send('今はクエスト中だﾜﾝ…');
		return false;
	}

	var quest_json = getJSONFileById(_quest_id);

	if (!quest_json) {
		_channel.send('そのidのクエストは存在しないﾜﾝ…');
		return false;
	}

	setQuestCron(quest_json, _channel);

	_channel.send('クエスト「' + quest_json.name + '」に行ってくるﾜﾝ！');
	_channel.send((Math.round((quest_json.necessary_ms / (1000 * 60)) * 10) / 10) + '分後に帰ってくるﾜﾝ！');

	is_going_quest = true;
}

var setQuestCron = (_quest_json, _channel) => {
	var completion_time = Date.now() + _quest_json.necessary_ms;

	var job = new cronJob({
		cronTime: new Date(completion_time),
		onTick: function () {
			returnFromQuest(_quest_json, _channel);
		},
		start: false
	});

	job.start();
};

var returnFromQuest = (_quest_json, _channel) => {
	var exp = Math.floor(Math.random() * (_quest_json.reward.max_exp - _quest_json.reward.min_exp) + _quest_json.reward.min_exp);
	_channel.send('ただいまﾜﾝ!!');

	var is_level_up = character.addExperience(_channel, exp);
	_channel.send(exp + 'の経験値を手に入れたﾜﾝ！');

	if (is_level_up) {
		_channel.send('レベルアップしたﾜﾝ!');
		_channel.send('レベルが' + character.getStatus()[0] + 'になったﾜﾝ！');
	}

	is_going_quest = false;
}


exports.getQuestList = () => {
	return getJSONList('quest_file');
};

var getJSONList = _path => {
	var file_list = fs.readdirSync(_path);
	var json_list = [];

	file_list.forEach( _file => {
		var file_path = _path + '/' + _file;

		if (path.extname(_file) === '.json') {
			var json = JSON.parse(fs.readFileSync(file_path));
			json_list.push(json);
		} else if (fs.lstatSync(file_path).isDirectory()) {
			var tmp_json_list = getJSONList(file_path);
			tmp_json_list.forEach( _json => {
				json_list.push(_json);
			});
		}
	});

	json_list.sort( (a, b) => {
		return a.id > b.id ? 1 : -1;
	});
	return json_list;
};

var getJSONFileById = _target_id => {
	var json_list = getJSONList('quest_file');

	for (var i = 0; i < json_list.length; i++) {
		if (json_list[i].id == _target_id) {
			return json_list[i];
		}
	}
	return false;
};