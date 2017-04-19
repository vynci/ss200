var SensorLog = require('../models/sensorLog.js');

var obj = {
	status : 'success',
	data : ''
};

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
			obj.data = user;
			return res.json(obj);
		}
	});
}

exports.getAllLogs = function(req, res) {
	console.log(req.query);
	SensorLog.find(function(err, user) {
		obj.data = user;		
		res.send(obj);
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

	SensorLog.find(filter, function(error, user) {
		obj.data = user;		
		res.send(obj);
	})
});

exports.getLogByUserId = (function(req, res) {
	SensorLog.find({userId: req.params.userId}, function(error, user) {
		obj.data = user;		
		res.send(obj);
	})
});