var users = require('../controllers/users');
var busStops = require('../controllers/busStops');
var helpers = require('../helpers/helperFunctions');

var routesAPI = function(app){
	//user routes
	app.post('/user/auth', users.auth);
	app.get('/user/logout', helpers.isAuthenticated, users.logout);

	//video routes
	app.get('/busStops', helpers.isAuthenticated, busStops.get);
	app.get('/video', helpers.isAuthenticated, busStops.getOne);
	app.post('/video/ratings', helpers.isAuthenticated, busStops.rate);
}


module.exports = routesAPI;