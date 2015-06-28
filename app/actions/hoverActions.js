var HoverStore = require("../stores/HoverStore.js");
var Immutable      = require("immutable");
var Promise        = require("promise");


var hoverActions = {}


hoverActions.clearHover = function() {
	return new Promise(function(resolve, reject) {
		HoverStore.setHoveredData(Immutable.Map());
		resolve();
	});
};


hoverActions.hoverCard = function(cardId) {
	return new Promise(function(resolve, reject) {
		HoverStore.setHoveredData(Immutable.Map({
			type: "card",
			cardId: cardId,
		}));
		resolve();
	});
};


hoverActions.hoverLink = function(cardId, inputName) {
	return new Promise(function(resolve, reject) {
		HoverStore.setHoveredData(Immutable.Map({
			type: "input",
			cardId: cardId,
			inputName: inputName,
		}));
		resolve();
	});
};


module.exports = hoverActions
