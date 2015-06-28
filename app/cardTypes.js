var Promise = require("promise");
var Request = require("request");
var _ = require("lodash"); 
var globalConfig = require("./globalConfig");

var cardTypes = {};

isNull = function(x){
	return typeof x !== "undefined" && x !== null;
}

cardTypes.number = {
	humanReadableName: "Number",
	cardClass: "variable",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			console.log("reading value ", cardData.value)
			return resolve(cardData.value);
		})
	},
	inputs: [],
	hasOutput: true,
};

cardTypes.httpGet = {
	humanReadableName: "GET",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(httpData);
		});
	},
	inputs: [],
	hasOutput: true,
};

cardTypes.httpResponse = {
	humanReadableName: "Response",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			console.log("answer ", inputs.data)
			if (!isNull(inputs.data)){
				Request.post({
					url: globalConfig.httpServerUrl + 'complete/' + requestID,
					json: true,
					body: {
						answer: inputs.data
					}
				}, function(error, response, body) {
					console.log("REQUEST");
					console.log("error: ", error);
					console.log("body: ", body);
					if(error) {
						reject(error);
					}
					else {
						resolve();
					}
				})
			} else {
				resolve();
			}
		})
	},
	inputs: ["data"],
	hasOutput: true,
};

cardTypes.add = {
	humanReadableName: "Add",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			console.log("ADDED ", inputs["number1"] + inputs["number2"]);
			return resolve(inputs["number1"] + inputs["number2"]);
		})
	},
	inputs: ["number1", "number2"],
	hasOutput: true,
};

cardTypes.subtract = {
	humanReadableName: "Subtract",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(inputs["number1"] - inputs["number2"]);
		});
	},
	inputs: ["number1", "number2"],
	hasOutput: true,
};

cardTypes.divide = {
	humanReadableName: "Divide",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(inputs["number1"] / inputs["number2"]);
		});
	},
	inputs: ["number1", "number2"],
	hasOutput: true,
};

cardTypes.multiply = {
	humanReadableName: "Multiply",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(inputs["number1"] * inputs["number2"]);
		});
	},
	inputs: ["number1", "number2"],
	hasOutput: true,
};

cardTypes.sortBy = {
	humanReadableName: "Sort By",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(_.sortBy(inputs["list"], inputs["sortKey"]));
		});
	},
	inputs: ["list", "sortKey"],
	hasOutput: true,
};

cardTypes.firebaseValye = {
	humanReadableName: "Firebase Value",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(_.sortBy(inputs["list"], inputs["sortKey"]));
		});
	},
	inputs: ["url", "path", "set", "push"],
	hasOutput: true,
};

module.exports = cardTypes;
