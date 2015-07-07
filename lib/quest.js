var cronJob = require('cron').CronJob;

var d = Date.now();
console.log(d);

exports.goQuest = function (necessary_ms, channel) {

	var completion_time = Date.now() + necessary_ms;

	var job = new cronJob({
		cronTime: new Date(completion_time),
		onTick: function () {
			returnQuest(channel);
		},
		start: false
	});

	job.start();
}

var returnQuest = function (channel) {
	channel.send('ただいまﾜﾝ!!');
}