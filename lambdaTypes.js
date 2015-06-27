var Promise = require("promise");


var lambdaTypes = {};


lambdaTypes.number = {
	name: "Number",
	run: function() {
		return new Promise(function(resolve, reject) {
			return resolve(null);
		});
	},
	inputs: [],
};


lambdaTypes.add = {
	name: "Add",
	run: function() {
		return new Promise(function(resolve, reject) {
			return resolve(null);
		});
	},
	inputs: ["number1", "number2"],
};


module.exports = lambdaTypes;
