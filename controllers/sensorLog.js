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
	console.log(req.query);
	SensorLog.find(function(err, user) {
		res.send(user);
	});
}

exports.getLogByDeviceId = (function(req, res) {
	console.log(req.query);
	var filter = {deviceId: req.params.deviceId}

	if(req.query.from || req.query.to){
		if(req.query.from && !req.query.to){
			filter.createdDate = {"$gte": new Date(req.query.from)};
		} else if(req.query.to && !req.query.from){
			filter.createdDate = {"$lt": new Date(req.query.to)};
		} else {
			filter.createdDate = {"$gte": new Date(req.query.from), "$lt": new Date(req.query.to)};
		}		
	}

	console.log(filter);

	SensorLog.find(filter, function(error, user) {
		res.send(user);
	})
});

exports.getLogByUserId = (function(req, res) {
	SensorLog.find({userId: req.params.userId}, function(error, user) {
		res.send(user);
	})
});