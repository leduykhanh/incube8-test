var busModel = require('../models/buses');

var buses = {};

// controller that handles bus listings fetch request.
buses.get = function (req, res) {
	
	var skip = req.query.skip;
	var limit = req.query.limit;

	var busesData = busModel.get(skip, limit);
	busesData.then(function(data){
		var response = {};
		response.status='success';
		response.data=data;
		res.send(response);
	}, function(err){
		res.send(err);
	});

};

// controller that handles single bus fetch request.
buses.getOne = function (req, res) {
	
	var busid = req.query.busId;

	var busesData = busModel.getOne(busid);
	busesData.then(function(data){
		var response = {};
		response.status='success';
		response.data=data;
		res.send(response);
	}, function(err){
		res.status(400);
		res.send(err);
	});
};

// controller that handles bus rate request
buses.rate = function (req, res) {
	
	var busId = req.body.busId;
	var rating = req.body.rating;

	var busesData = busModel.rate(busId, rating);
	busesData.then(function(data){
		var response = {};
		response.status='success';
		response.data=data;
		res.send(response);
	}, function(err){
		res.status(400);
		res.send(err);
	});
		
};


module.exports = buses;