var Promise = require("promise");
var Request = require("request");
var globalConfig = require("./globalConfig");

var cardTypes = {};


cardTypes.number = {
	humanReadableName: "Number",
	cardClass: "variable",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(cardData.value);
		});
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
			request.post('api.f0rge.io/complete/' + requestID, inputs[data])
			return resolve(inputs.data);
		});
	},
	inputs: ["data"],
	hasOutput: true,
};

cardTypes.add = {
	humanReadableName: "Add",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(inputs["number1"] + inputs["number2"]);
		});
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

cardTypes.sort = {
	humanReadableName: "SortBy",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(inputs["number1"] * inputs["number2"]);
		});
	},
	inputs: ["number1", "number2"],
	hasOutput: true,
};

module.exports = cardTypes;
