var Promise = require("promise");


var cardTypes = {};


cardTypes.number = {
	name: "Number",
	run: function() {
		return new Promise(function(resolve, reject) {
			return resolve(null);
		});
	},
	inputs: [],
};


cardTypes.add = {
	name: "Add",
	run: function() {
		return new Promise(function(resolve, reject) {
			return resolve(null);
		});
	},
	inputs: ["number1", "number2"],
};


module.exports = cardTypes;
