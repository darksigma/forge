var Promise = require("promise");


var cardTypes = {};


cardTypes.number = {
	humanReadableName: "Number",
	cardClass: "variable",
	run: function() {
		return new Promise(function(resolve, reject) {
			return resolve(null);
		});
	},
	inputs: [],
};


cardTypes.add = {
	humanReadableName: "Add",
	cardClass: "function",
	run: function() {
		return new Promise(function(resolve, reject) {
			return resolve(null);
		});
	},
	inputs: ["number1", "number2"],
};


module.exports = cardTypes;
