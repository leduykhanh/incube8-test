var userModel = require('../models/users');

var users = {};

// controller that handles user login request
users.auth = function (req, res) {

	if(!req.body.email || !req.body.password)
	{
		res.status(400);
		res.send({status:'error',error:'email or password is missing.'});	
	}
	
	var user = userModel.authUser(req.body.email, req.body.password);

	user.then(function(users){
		if(users.status == 'error') res.status(400);
		res.send(users);	
	}, function(){
		res.send({status:'error',error:'Error occured while fetching data from database.'});
	});

};

// controller that handles user logout request
users.logout = function (req, res) {

	var sessionId = req.query.sessionId;

	var user = userModel.logout(sessionId);

	res.send({status:'success'});	
	

};


module.exports = users;