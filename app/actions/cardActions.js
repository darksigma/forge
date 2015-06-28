var _          = require("lodash");
var GraphStore = require("../stores/GraphStore.js");
var Promise    = require("promise");
var Immutable  = require("Immutable");
var cardTypes  = require("../cardTypes.js");


var cardActions = {}


cardActions.createCardAtCell = function(cardType, coordinate) {
	return new Promise(function(resolve, reject) {
		var cardTypeDefinition = cardTypes[cardType];

		GraphStore.createCard({
			type: cardType,
			x: coordinate.x,
			y: coordinate.y
		}).then(function(newCardId) {
			if (_.isFunction(cardTypeDefinition.initialize)) {
				cardTypeDefinition.initialize(newCardId, GraphStore);
			}
			else {
				resolve();
			}
		});
	});
};


cardActions.editCardVariable = function(cardId, variableValue) {
	return GraphStore.updateCardData(cardId, {
		value: variableValue
	});
};


module.exports = cardActions
