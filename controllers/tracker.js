var Tracker = require('../models/tracker.js');

exports.createTracker = function(req, res) {
	console.log(req.body);
	var tracker = new Tracker({
		ownerId: req.body.ownerId,
		name: req.body.name,
		location: req.body.location,
		trackerKey : req.body.trackerKey
	});

	tracker.save(function (err, tracker) {
		if (err){
			return res.json(err);
		}

		else {
			return res.json(tracker);
		}
	});
}

exports.getAllTrackers = function(req, res) {
	Tracker.find(function(err, tracker) {
		res.send(tracker);
	});
}

exports.getTrackerById = (function(req, res) {
	Tracker.findOne({_id: req.params.id}, function(error, tracker) {
		res.send(tracker);
	})
});

exports.getTrackersByUserId = (function(req, res) {
	console.log(req.params);

	Tracker.find({ownerId: req.params.ownerId}, function(error, trackers) {
		res.send(trackers);
	})
});

exports.getTrackerByUserIdAndTrackerId = (function(req, res) {
	console.log(req.params);

	Tracker.find({ownerId: req.params.ownerId, _id: req.params.trackerId}, function(error, trackers) {
		res.send(trackers);
	})
});

exports.updateTrackerByTrackerId = (function(req, res) {
    console.log(req.params);
	var body = req.body;

	Tracker.findOneAndUpdate({_id: req.params.trackerId}, { $set: body}, {new: true}, function (error, tracker) {
		if (error) {
			return res.json(error);
		}
		res.send(tracker);
	});
});

exports.deleteTrackerByUserIdAndTrackerId = (function(req, res) {
	console.log(req.params);

	Tracker.findOneAndRemove({owner: req.params.ownerId, _id: req.params.trackerId}, function (error, tracker) {
		if (error) {
			return res.json(error);
		}
		res.send('tracker successfully deleted');
	});
});