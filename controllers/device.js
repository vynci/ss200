var Device = require('../models/device.js');

exports.createDevice = function(req, res) {
	console.log(req.body);
	var device = new Device({
		userId : req.body.userId || '',
		deviceId : req.body.deviceId || '',
		data : req.body.data || '',
        name : req.body.name || '' 
	});

	device.save(function (err, result) {
		if (err){
			return res.json(err);
		}

		else {
			return res.json(result);
		}
	});
}

exports.getAllDevices = function(req, res) {
	Device.find(function(err, result) {
		res.send(result);
	});
}

exports.getDeviceById = (function(req, res) {
	Device.find({deviceId: req.params.deviceId}, function(error, result) {
		res.send(result);
	})
});

exports.getDeviceByUser = (function(req, res) {
	Device.find({userId: req.params.userId}, function(error, result) {
		res.send(result);
	})
});

exports.updateDeviceById = (function(req, res) {
    console.log(req.params);
	var body = req.body;

	Device.findOneAndUpdate({_id: req.params.deviceId}, { $set: body}, {new: true}, function (error, result) {
		if (error) {
			return res.json(error);
		}
		res.send(result);
	});
});

exports.deleteDeviceById = (function(req, res) {
	console.log(req.params);

	Device.findOneAndRemove({_id: req.params.deviceId}, function (error, result) {
		if (error) {
			return res.json(error);
		}
		res.send('device successfully deleted');
	});
});