var SensorLog = require('../models/sensorLog.js');

exports.createLog = function(req, res) {
	console.log(req.body);
	var sensorLog = new SensorLog({
		userId: req.body.userId || '',
		deviceId: req.body.deviceId || '',
		data: req.body.data
	});

	sensorLog.save(function (err, user) {
		if (err){
			return res.json(err);
		}

		else {
			return res.json(user);
		}
	});
}

exports.getAllLogs = function(req, res) {
	SensorLog.find(function(err, user) {
		res.send(user);
	});
}

exports.getLogByDeviceId = (function(req, res) {
	SensorLog.find({deviceId: req.params.deviceId}, function(error, user) {
		res.send(user);
	})
});

exports.getLogByUserId = (function(req, res) {
	SensorLog.find({userId: req.params.userId}, function(error, user) {
		res.send(user);
	})
});