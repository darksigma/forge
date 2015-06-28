var DragStore = require("../stores/DragStore.js");
var Promise   = require("promise");
var Immutable = require("Immutable");


var dragActions = {}


dragActions.startDrag = function(cardId, startX, startY, offsetX, offsetY) {
	return new Promise(function(resolve, reject) {
		DragStore.updateData(Immutable.Map({
			cardId: cardId,
			startX: startX,
			startY: startY,
			offsetX: offsetX,
			offsetY: offsetY,
		}));
		resolve();
	});
};


dragActions.continueDrag = function(cardId, offsetX, offsetY) {
	return new Promise(function(resolve, reject) {
		DragStore.updateData(Immutable.Map({
			cardId: cardId,
			offsetX: offsetX,
			offsetY: offsetY,
		}));
		resolve();
	});
};


dragActions.endDrag = function(cardId) {
	return new Promise(function(resolve, reject) {
		DragStore.updateData(Immutable.Map({
			cardId: null,
			startX: null,
			startY: null,
			offsetX: null,
			offsetY: null,
		}));
		resolve();
	});
};


module.exports = dragActions
