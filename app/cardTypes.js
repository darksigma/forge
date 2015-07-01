var Promise = require("promise");
var Request = require("request");
var _ = require("lodash");
var Firebase = require('firebase');
var globalConfig = require("./globalConfig");

var cardTypes = {};

var functionIcon = "/assets/red.svg";
var httpIcon     = "/assets/yellow.svg";
var variableIcon = "/assets/orange.svg";
var firebaseIcon = "/assets/firebase.png";

isNotNull = function(x){
	return typeof x !== "undefined" && x !== null;
}

var runVariable = function(inputs, cardData, httpData, requestID) {
	return new Promise(function(resolve, reject) {
		try {
			var parsed = JSON.parse(cardData.value);
			return resolve(parsed);
		} catch (e) {
			return resolve(cardData.value)
		}
	})
};

cardTypes.number = {
	humanReadableName: "Number",
	cardClass: "variable",
	run: runVariable,
	inputs: [],
	hasOutput: true,
	icon: variableIcon,
};

cardTypes.string = {
	humanReadableName: "String",
	cardClass: "variable",
	run: runVariable,
	inputs: [],
	hasOutput: true,
	icon: variableIcon,
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
	icon: httpIcon,
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
	icon: httpIcon,
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
	icon: httpIcon,
	hasOutput: true,
};

cardTypes.httpResponse = {
	humanReadableName: "Response",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			if (isNotNull(inputs.data)){
				Request.post({
					url: globalConfig.httpServerUrl + 'complete/' + requestID,
					json: true,
					body: {
						answer: inputs.data
					}
				}, function(error, response, body) {
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
	icon: httpIcon,
	hasOutput: true,
};

cardTypes.add = {
	humanReadableName: "Add",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(inputs["number1"] + inputs["number2"]);
		})
	},
	inputs: ["number1", "number2"],
	icon: functionIcon,
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
	icon: functionIcon,
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
	icon: functionIcon,
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
	icon: functionIcon,
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
	icon: functionIcon,
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
	icon: functionIcon,
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
	icon: functionIcon,
	hasOutput: true,
};

cardTypes.concat = {
	humanReadableName: "Concat",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(inputs["string1"] + inputs["string2"]);
		});
	},
	inputs: ["string1", "string2"],
	icon: functionIcon,
	hasOutput: true,
};

cardTypes.last = {
	humanReadableName: "Last",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(_.rest(inputs["list"], inputs["amount"]));
		});
	},
	inputs: ["list", "amount"],
	icon: functionIcon,
	hasOutput: true,
};

cardTypes.first = {
	humanReadableName: "First",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(_.take(inputs["list"], inputs["amount"]));
		});
	},
	inputs: ["list", "amount"],
	icon: functionIcon,
	hasOutput: true,
};

cardTypes.chunk = {
	humanReadableName: "Chunk",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(_.chunk(inputs["list"], inputs["size"]));
		});
	},
	inputs: ["list", "size"],
	icon: functionIcon,
	hasOutput: true,
};

cardTypes.compact = {
	humanReadableName: "Compact",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(_.compact(inputs["list"]));
		});
	},
	inputs: ["list"],
	icon: functionIcon,
	hasOutput: true,
};

cardTypes.exclude = {
	humanReadableName: "Exclude",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(_.difference(inputs["list"], inputs["exclude"]));
		});
	},
	inputs: ["list", "exclude"],
	icon: functionIcon,
	hasOutput: true,
};

cardTypes

cardTypes.reverse = {
	humanReadableName: "Reverse",
	cardClass: "function",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			return resolve(_.clone(inputs["list"]).reverse());
		});
	},
	inputs: ["list"],
	icon: functionIcon,
	hasOutput: true,
};

cardTypes.firebaseSet = {
	humanReadableName: "Firebase Set",
	cardClass: "function",
	icon: "/assets/firebase.png",
	run: function(inputs, cardData, httpData, requestID) {
		return new Promise(function(resolve, reject) {
			var fb = new Firebase(inputs["url"] + inputs["path"]);
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
	icon: firebaseIcon,
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
	icon: firebaseIcon,
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
	icon: firebaseIcon,
	hasOutput: true,
};

module.exports = cardTypes;
