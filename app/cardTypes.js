var Promise = require("promise");
var Request = require("request");
var _ = require("lodash");
var Firebase = require('firebase');
var globalConfig = require("./globalConfig");

var cardTypes = {};

isNotNull = function(x){
	return typeof x !== "undefined" && x !== null;
}

var runVariable = function(inputs, cardData, httpData, requestID) {
	return new Promise(function(resolve, reject) {
		console.log("variable function ", cardData.value)
		return resolve(cardData.value);
	})
};

cardTypes.number = {
	humanReadableName: "Number",
	cardClass: "variable",
	run: runVariable,
	initialize: function(cardId, GraphStore) {
		GraphStore.updateCardData(cardId, {
			value: 0
		});
	},
	inputs: [],
	hasOutput: true,
};

cardTypes.string = {
	humanReadableName: "String",
	cardClass: "variable",
	run: runVariable,
	initialize: function(cardId, GraphStore) {
		GraphStore.updateCardData(cardId, {
			value: ""
		});
	},
	inputs: [],
	hasOutput: true,
};

cardTypes.httpGet = {
	humanReadableName: "GET",
	cardClass: "request",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(httpData);
		});
	},
	inputs: [],
	hasOutput: true,
};

cardTypes.httpPost = {
	humanReadableName: "POST",
	cardClass: "request",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(httpData);
		});
	},
	inputs: [],
	hasOutput: true,
};

cardTypes.httpPut = {
	humanReadableName: "PUT",
	cardClass: "request",
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
			if (isNotNull(inputs.data)){
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

cardTypes.filter = {
	humanReadableName: "Filter",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(_.filter(inputs["list"], function(json){
				return json[inputs["filterKey"]] === inputs["equalsValue"]
			}));
		});
	},
	inputs: ["list", "filterKey", "equalsValue"],
	hasOutput: true,
};

cardTypes.jsonKey = {
	humanReadableName: "JSON Key",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(inputs["object"][inputs["key"]]);
		});
	},
	inputs: ["key", "object"],
	hasOutput: true,
};

cardTypes.concat = {
	humanReadableName: "Concat",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(inputs[string1] + inputs[string2]);
		});
	},
	inputs: ["string1", "string2"],
	hasOutput: true,
};

cardTypes.last = {
	humanReadableName: "Last",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(_.slice(inputs["list"], inputs["List"].length - inputs["amount"]));
		});
	},
	inputs: ["list", "amount"],
	hasOutput: true,
};

cardTypes.first = {
	humanReadableName: "First",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(_.slice(inputs["list"], 0, inputs["amount"]));
		});
	},
	inputs: ["list", "amount"],
	hasOutput: true,
};

cardTypes.firebaseSet = {
	humanReadableName: "Firebase Set",
	cardClass: "function",
	icon: "/assets/firebase.png",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			var fb = new Firebase(globalConfig.firebaseUrl + inputs["url"]);
			fb.set(inputs["set"], function(error){
				if(error){
					return resolve(null)
				} else {
					return resolve(inputs["set"])
				}
			});
		});
	},
	inputs: ["url", "path", "set"],
	hasOutput: true,
};

cardTypes.firebasePush = {
	humanReadableName: "Firebase Push",
	cardClass: "function",
	icon: "/assets/firebase.png",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			var fb = new Firebase(inputs["url"] + inputs["path"]);
			var pushRef = fb.push();
			pushRef.set(inputs["set"], function(error){
				if(error){
					return resolve(null);
				} else {
					return resolve(inputs["set"]);
				}
			});
		});
	},
	inputs: ["url", "path", "set"],
	hasOutput: true,
};

cardTypes.firebaseGet = {
	humanReadableName: "Firebase Get",
	cardClass: "function",
	icon: "/assets/firebase.png",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			var fb = new Firebase(inputs["url"] + inputs["path"]);
			fb.once('value', function (snapshot){
				return resolve(snapshot.val());
			}, function(err){
				return resolve(null);
			});
		});
	},
	inputs: ["url", "path"],
	hasOutput: true,
};

module.exports = cardTypes;
