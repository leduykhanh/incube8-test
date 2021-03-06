var mongoose = require('mongoose');
var q = require('q');

//defining schema for buses table
var buseschema = new mongoose.Schema({
	  name: { type: String }, 
	  description: { type: String }, 
	  url: String,
	  ratings: []
});

var bus = mongoose.model('buses', buseschema);

//Initlizing interface object of this model.
var busesModel = {};

//Function to seed buses data.
busesModel.seed = function(){
	var buses=Array();


	var dataToInsert = Array();

	
	bus.collection.insert(dataToInsert, function(err, bus) {
		if(err){
			console.log('error occured in populating database');	
			console.log(err);	
		} 
		else{
			console.log('buses table populated.');	
		}	
	});
	
}

//function to get bus listings
busesModel.get = function(skip, limit){
	var results = q.defer();

	skip = parseInt(skip) || 0;
	limit = parseInt(limit) || 10;

	bus.find(function(err, dbbus) {
		if (err){
			results.reject(err);
		} 
		
		results.resolve(dbbus);
	}).skip(skip).limit(limit);

	return results.promise;
	
}

//function to get single bus by its id.
busesModel.getOne = function(id){
	var results = q.defer();

	if(!id){
		results.reject({status:'error', error:'bus Id not supplied.'});
	}

	bus.findOne({_id:id},function(err, dbbus) {
		if (err){
			results.reject(err);
		} 
		
		if(dbbus){
			results.resolve(dbbus);	
		} else{
			results.reject({status:'error', error:'Invalid bus Id supplied.'});	
		}
		
	});

	return results.promise;
	
}


module.exports = busesModel;