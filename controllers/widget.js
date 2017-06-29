var Widget = require('../models/widget');

var obj = {
	status : 'success',
	data : ''
};

exports.createWidget = function(req, res) {
	console.log(req.body);
	var widget = new Widget({
		dashboardId : req.body.dashboardId || '',
		cols : req.body.cols || 0,
        rows : req.body.rows || 0,
        x : req.body.x || 0,
        y : req.body.y || 0 ,
		backgroundColor : req.body.backgroundColor || 'green'       
	});

	widget.save(function (err, result) {
		if (err){
			return res.json(err);
		}

		else {
			obj.data = result;
			return res.json(obj);
		}
	});
}

exports.getAllWidgets = function(req, res) {
	Widget.find(function(err, result) {
		obj.data = result;
		res.send(obj);
	});
}

exports.getWidgetById = (function(req, res) {
	Widget.findOne({_id: req.params.id}, function(error, result) {
		obj.data = result;
		res.send(obj);
	})
});

exports.getWidgetByDashboardId = (function(req, res) {
	Widget.find({dashboardId: req.params.dashboardId}, function(error, result) {
		obj.data = result;
		res.send(obj);
	})
});

exports.updateWidgetById = (function(req, res) {
    console.log(req.params);
	console.log(req.body);
	var body = req.body;

	Widget.findOneAndUpdate({_id: req.params.widgetId}, { $set: body}, {new: true}, function (error, result) {
		if (error) {
			return res.json(error);
		}
		obj.data = result;
		res.send(obj);
	});
});

exports.deleteWidgetById = (function(req, res) {
	console.log(req.params);

	Widget.findOneAndRemove({_id: req.params.widgetId}, function (error, result) {
		if (error) {
			return res.json(error);
		}
		res.send('widget successfully deleted');
	});
});