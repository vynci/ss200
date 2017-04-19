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
	var filter = {};
	var limit = req.query.limit;
	var skip = req.query.skip;
	var sort = req.query.sort || null;		

	if(req.query.from || req.query.to){
		if(req.query.from && !req.query.to){
			filter.timestamp = {"$gte": new Date(req.query.from)};
		} else if(req.query.to && !req.query.from){
			filter.timestamp = {"$lt": new Date(req.query.to)};
		} else {
			filter.timestamp = {"$gte": new Date(req.query.from), "$lt": new Date(req.query.to)};
		}		
	}

	if(limit){
		limit = parseInt(limit);
	}else{
		limit = null;
	}

	if(skip){
		skip = parseInt(skip);
	}else{
		skip = null;
	}

	SensorLog.find(filter).limit(limit).sort(sort).skip(skip).exec(function(error, user) {
		obj.data = user;		
		res.send(obj);
	});	
}

exports.getLogByDeviceId = (function(req, res) {
	console.log(req.query);
	var filter = {deviceId: req.params.deviceId}
	var limit = req.query.limit;
	var skip = req.query.skip;
	var sort = req.query.sort || null;	

	if(req.query.from || req.query.to){
		if(req.query.from && !req.query.to){
			filter.timestamp = {"$gte": new Date(req.query.from)};
		} else if(req.query.to && !req.query.from){
			filter.timestamp = {"$lt": new Date(req.query.to)};
		} else {
			filter.timestamp = {"$gte": new Date(req.query.from), "$lt": new Date(req.query.to)};
		}		
	}

	if(limit){
		limit = parseInt(limit);
	}else{
		limit = null;
	}

	if(skip){
		skip = parseInt(skip);
	}else{
		skip = null;
	}	

	SensorLog.find(filter).limit(limit).sort(sort).skip(skip).exec(function(error, user) {
		obj.data = user;		
		res.send(obj);
	});
});

exports.getLogByUserId = (function(req, res) {
	SensorLog.find({userId: req.params.userId}, function(error, user) {
		obj.data = user;		
		res.send(obj);
	})
});