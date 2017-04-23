var busStopModel = require('../models/busStops');

var busStops = {};

// controller that handles bus listings fetch request.
busStops.get = function (req, res) {
	
	var skip = req.query.skip;
	var limit = req.query.limit;

	var busStopsData = busStopModel.get(skip, limit);
	busStopsData.then(function(data){
		var response = {};
		response.status='success';
		response.data=data;
		res.send(response);
	}, function(err){
		res.send(err);
	});

};

// controller that handles single bus fetch request.
busStops.getOne = function (req, res) {
	
	var busid = req.query.busId;

	var busStopsData = busStopModel.getOne(busid);
	busStopsData.then(function(data){
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
busStops.add = function (req, res) {
	
	var busStopId = req.body.busStopId;
	var busInfo = req.body.busInfo;

	var busStopsData = busStopModel.add(busStopId, busInfo);
	busStopsData.then(function(data){
		var response = {};
		response.status='success';
		response.data=data;
		res.send(response);
	}, function(err){
		res.status(400);
		res.send(err);
	});
		
};


module.exports = busStops;