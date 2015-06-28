var _ = require("lodash");


var gridHelpers = {};


gridHelpers.getCellsInView = function(grid) {
	var windowHeight = grid.get("windowHeight");
	var windowWidth  = grid.get("windowWidth");
	var cellWidth    = grid.get("cellWidth");
	var transX       = grid.get("transX");
	var transY       = grid.get("transY");

	var topXIndex = Math.floor(transX / cellWidth);
	var topYIndex = Math.floor(transY / cellWidth);

	var xStart = (cellWidth - transY) % cellWidth;
	var yStart = (cellWidth - transX) % cellWidth;

	var numX = Math.ceil((windowWidth + xStart) / cellWidth) + 1;
	var numY = Math.ceil((windowHeight + yStart) / cellWidth) + 1;

	var coordinates = [];

	for(var x = 0; x < numX; x++) {
		for(var y = 0; y < numY; y++) {
			coordinates.push({
				x: topXIndex + x,
				y: topYIndex + y
			});
		}
	}

	return coordinates;
};


gridHelpers.getCardIdForCoordinate = function(coordinate, cards) {
	var cardIdForCoordinate = null;
	_.find(cards, function(cardData, cardId) {
		if (cardData.x === coordinate.x && cardData.y === coordinate.y) {
			cardIdForCoordinate = cardId;
			return true;
		}
		else {
			return false;
		}
	});
	return cardIdForCoordinate;
};


gridHelpers.closestCellToDrag = function(cellsInView, grid, drag) {
	var windowHeight = grid.get("windowHeight");
	var windowWidth  = grid.get("windowWidth");
	var cellWidth    = grid.get("cellWidth");
	var transX       = grid.get("transX");
	var transY       = grid.get("transY");

	var dragX = drag.get("startX") + drag.get("offsetX");
	var dragY = drag.get("startY") + drag.get("offsetY");

	var offsetDragX = dragX + transX;
	var offsetDragY = dragY + transY;

	var cellX = Math.round(offsetDragX / cellWidth);
	var cellY = Math.round(offsetDragY / cellWidth);

	return {
		x: cellX,
		y: cellY
	};
};


module.exports = gridHelpers;
