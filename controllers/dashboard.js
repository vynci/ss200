var Dashboard = require('../models/dashboard');

var obj = {
	status : 'success',
	data : ''
};

exports.createDashboard = function(req, res) {
	console.log(req.body);
	var dashboard = new Dashboard({
		userId : req.body.userId || '',
		description : req.body.description || '',
        name : req.body.name || ''
	});

	dashboard.save(function (err, result) {
		if (err){
			return res.json(err);
		}

		else {
			obj.data = result;
			return res.json(obj);
		}
	});
}

exports.getAllDashboards = function(req, res) {
	Dashboard.find(function(err, result) {
		obj.data = result;
		res.send(obj);
	});
}

exports.getDashboardById = (function(req, res) {
	Dashboard.findOne({_id: req.params.id}, function(error, result) {
		obj.data = result;
		res.send(obj);
	})
});

exports.getDashboardByUser = (function(req, res) {
	Dashboard.find({userId: req.params.userId}, function(error, result) {
		obj.data = result;
		res.send(obj);
	})
});

exports.updateDashboardById = (function(req, res) {
    console.log(req.params);
	var body = req.body;

	Dashboard.findOneAndUpdate({_id: req.params.id}, { $set: body}, {new: true}, function (error, result) {
		if (error) {
			return res.json(error);
		}
		obj.data = result;
		res.send(obj);
	});
});

exports.deleteDashboardById = (function(req, res) {
	console.log(req.params);

	Dashboard.findOneAndRemove({_id: req.params.id}, function (error, result) {
		if (error) {
			return res.json(error);
		}
		res.send('dashboard successfully deleted');
	});
});