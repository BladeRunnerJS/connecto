"use strict";

var Randomator = function(){}

Randomator.prototype.getSetNumberOfRandoms = function(n, max) {
	
	var randomArray = [];
	
	for(var i = 0; randomArray.length < n; i++)
	{
		var newEntry = Math.round(Math.random() * max);
		if(randomArray.indexOf(newEntry) == -1)
		{
			randomArray.push(newEntry);
		}
	}			
	
	return randomArray;
};

Randomator.prototype.getRandomNumberUpTo = function(max) {
	return Math.round((max-1) * Math.random());
};

module.exports = Randomator;
