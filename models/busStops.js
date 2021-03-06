var mongoose = require('mongoose');
var q = require('q');

//defining schema for buses table
var busStopschema = new mongoose.Schema({
	  name: { type: String }, 
	  lat: { type: Number }, 
	  lon: { type: Number },
	  buses: []
});

var busStop = mongoose.model('busStops', busStopschema);
//Initlizing interface object of this model.
var busStopsModel = {};

//Function to seed buses data.
busStopsModel.seed = function(){



	var dataToInsert = Array({name:"11124",lat:1.3610898 , lon:103.8446584 },
		{name:"11125",lat:1.3610898 , lon:102.8446584 },
		{name:"11126",lat:1.3710898 , lon:104.8446584 },
		{name:"11127",lat:1.3510898 , lon:103.8446584 });

	
	busStop.collection.insert(dataToInsert, function(err, bus) {
		if(err){
			console.log('error occured in populating database');	
			console.log(err);	
		} 
		else{
			console.log('buses table populated.');	
		}	
	});
	
}

//function to get busStop listings
busStopsModel.get = function(skip, limit){
	var results = q.defer();

	skip = parseInt(skip) || 0;
	limit = parseInt(limit) || 10;

	busStop.find(function(err, dbbus) {
		if (err){
			results.reject(err);
		} 
		
		results.resolve(dbbus);
	}).skip(skip).limit(limit);

	return results.promise;
	
}
//function to add single bus by its id.
busStopsModel.add = function(id, buses){
	var results = q.defer();
	var error=false;

	if(!id){
		results.reject({status:'error', error:'bus Id not supplied.'});
		error = true;
	}
	if(!buses){
		results.reject({status:'error', error:'bus number not supplied.'});
		error = true;
	}

	// if(buses<0 || buses>5){
	// 	results.reject({status:'error', error:'User buses is out of range.'});
	// 	error = true;
	// }

	if(error==false){
		bus.findOne({_id:id},function(err, dbbus) {
			if (err){
				results.reject(err);
			} 

			dbbus.buses.push(buses)
			
			dbbus.markModified('array');
	    	dbbus.save();

			results.resolve(dbbus);
		});
	}
	

	return results.promise;
	
}


module.exports = busStopsModel;