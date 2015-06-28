var _           = require("lodash");
var DragStore   = require("../stores/DragStore.js");
var GridStore   = require("../stores/GridStore.js");
var GraphStore  = require("../stores/GraphStore.js");
var Promise     = require("promise");
var Immutable   = require("Immutable");
var gridHelpers = require("../helpers/gridHelpers.js");
var dropHandler = require("../helpers/dropHandler.js");


var dragActions = {}


dragActions.startDrag = function(dragData, startX, startY, offsetX, offsetY) {
	return new Promise(function(resolve, reject) {
		var components = dropHandler.getComponents();
		var componentRects = _.map(components, function(component) {
			return {
				component: component,
				rect: component.getDOMNode().getBoundingClientRect(),
				node: component.getDOMNode()
			};
		});

		DragStore.updateData(Immutable.Map({
			dragData: dragData,
			startX: startX,
			startY: startY,
			offsetX: offsetX,
			offsetY: offsetY,
			componentRects, componentRects,
		}));
		resolve();
	}).done();
};


dragActions.continueDrag = function(currentTarget, offsetX, offsetY) {
	return new Promise(function(resolve, reject) {
		var drag     = DragStore.getData();
		var currentX = drag.get("startX") + offsetX;
		var currentY = drag.get("startY") + offsetY;

		// First attempt to find an element contained in a drop node.
		var draggedOver = _.find(drag.get("componentRects"), function(data) {
			return data.node.contains(currentTarget);
		});

		// Then use a rect computation.
		// TODO: Use document order? Possibly sort by reverse order.
		if (!draggedOver) {
			draggedOver = _.find(drag.get("componentRects"), function(data) {
				return (
					data.rect.left <= currentX &&
					data.rect.right >= currentX &&
					data.rect.top <= currentY &&
					data.rect.bottom >= currentY
				);
			});
		}

		if (draggedOver) {
			var draggedOverComponent = draggedOver.component;
		}

		DragStore.updateData(Immutable.Map({
			offsetX: offsetX,
			offsetY: offsetY,
			draggedOverComponent: draggedOverComponent,
		}));
		resolve();
	}).done();
};


dragActions.endDrag = function() {
	return new Promise(function(resolve, reject) {
		var grid                 = GridStore.getData();
		var drag                 = DragStore.getData();
		var cellsInView          = gridHelpers.getCellsInView(grid);
		var dragCellCoordinate   = gridHelpers.closestCellToDrag(cellsInView, grid, drag);
		var draggedOverComponent = drag.get("draggedOverComponent");

		if (draggedOverComponent && _.isFunction(draggedOverComponent.handleDrop)) {
			draggedOverComponent.handleDrop(drag.get("dragData"));
		}

		DragStore.updateData(Immutable.Map({
			dragData: null,
			startX: null,
			startY: null,
			offsetX: null,
			offsetY: null,
			componentRects: null,
			draggedOverComponent: null,
		}));
		resolve();
	}).done();
};


dragActions.dropCardInCell = function(cardId, coordinate) {
	return new Promise(function(resolve, reject) {
		GraphStore.updateCardData(cardId, coordinate);
		resolve();
	}).done();
};


dragActions.createLink = function(outputCardId, inputCardId, inputName) {
	return new Promise(function(resolve, reject) {
		if (inputCardId !== outputCardId) {
			GraphStore.setCardInput(inputCardId, inputName, outputCardId);			
		}
		resolve();
	}).done();
};


module.exports = dragActions
