var User = require('../models/user.js');

exports.createUser = function(req, res) {
	console.log(req.body);
	var user = new User({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email
	});

	user.save(function (err, user) {
		if (err){
			return res.json(err);
		}

		else {
			return res.json(user);
		}
	});
}

exports.getAllUsers = function(req, res) {
	User.find(function(err, user) {
		res.send(user);
	});
}

exports.getUserById = (function(req, res) {
	User.findOne({_id: req.params.id}, function(error, user) {
		res.send(user);
	})
});