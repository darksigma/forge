var GraphStore = require("../stores/GraphStore.js");
var Promise   = require("promise");
var Immutable = require("Immutable");


var cardActions = {}


cardActions.createCardAtCell = function(cardType, coordinate) {
	return new Promise(function(resolve, reject) {
		GraphStore.createCard({
			type: cardType,
			x: coordinate.x,
			y: coordinate.y
		});
		resolve();
	});
};


module.exports = cardActions
