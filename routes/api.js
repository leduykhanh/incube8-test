var users = require('../controllers/users');
var busStops = require('../controllers/busStops');
var helpers = require('../helpers/helperFunctions');

var routesAPI = function(app){
	//user routes
	app.post('/user/auth', users.auth);
	app.get('/user/logout', helpers.isAuthenticated, users.logout);

	//bus routes
	app.get('/busStops', helpers.isAuthenticated, busStops.get);
	app.get('/busStop', helpers.isAuthenticated, busStops.getOne);
	app.post('/bus/add', helpers.isAuthenticated, busStops.add);
}


module.exports = routesAPI;