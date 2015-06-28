var DragStore   = require("../stores/DragStore.js");
var GridStore   = require("../stores/GridStore.js");
var GraphStore  = require("../stores/GraphStore.js");
var Promise     = require("promise");
var Immutable   = require("Immutable");
var gridHelpers = require("../helpers/gridHelpers.js");


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
		var grid                = GridStore.getData();
		var drag                = DragStore.getData();
		var cellsInView         = gridHelpers.getCellsInView(grid);
		var dragCellCoordinate = gridHelpers.closestCellToDrag(cellsInView, grid, drag);

		if (dragCellCoordinate) {
			var cardIdForCoordinate = gridHelpers.getCardIdForCoordinate(dragCellCoordinate, GraphStore.getData().cards);

			if (!cardIdForCoordinate) {
				GraphStore.updateCardData(cardId, dragCellCoordinate);
			}
		}

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
