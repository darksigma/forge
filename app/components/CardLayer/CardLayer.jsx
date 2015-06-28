var _                = require("lodash");
var React            = require("react/addons");
var classSet         = React.addons.classSet;
var PureRenderMixin  = React.addons.PureRenderMixin;
var Card             = require("../Card/Card.jsx");
var EmptyCell        = require("../EmptyCell/EmptyCell.jsx");
var selectionActions = require("../../actions/selectionActions.js");


var CardLayer = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		var _this = this;
		var cellsInView = this.getCellsInView();

		if (this.props.drag.get("cardId")) {
			var dragCellCoordinates = this.closestCellToDrag(cellsInView);
		}

		var cells = _.map(cellsInView, function(coordinate) {
			return _this.renderCell(coordinate, dragCellCoordinates);
		});

		return (
			<div className="CardLayer">
				<div className="Background" onMouseDown={this.handleBackgroundMouseDown}></div>
				<div className="Cells">
					{cells}
				</div>
			</div>
		);
	},


	getCellsInView: function() {
		var grid         = this.props.grid;
		var windowHeight = grid.get("windowHeight");
		var windowWidth  = grid.get("windowWidth");
		var cellWidth    = grid.get("cellWidth");
		var transX       = grid.get("transX");
		var transY       = grid.get("transY");

		var topXIndex = Math.floor(transX / cellWidth);
		var topYIndex = Math.floor(transY / cellWidth);

		var xStart = (cellWidth - transY) % cellWidth;
		var yStart = (cellWidth - transX) % cellWidth;

		var numX = Math.ceil((windowWidth + xStart) / cellWidth);
		var numY = Math.ceil((windowHeight + yStart) / cellWidth);

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
	},


	renderCell: function(coordinate, dragCellCoordinates) {
		var cellWidth  = this.props.grid.get("cellWidth");
		var x          = (coordinate.x * cellWidth) - this.props.grid.get("transX");
		var y          = (coordinate.y * cellWidth) - this.props.grid.get("transY");

		var cardIdForCoordinate = this.getCardIdForCoordinate(coordinate);

		if (cardIdForCoordinate) {
			var isSelected = this.props.selection.get("selectedCard") === cardIdForCoordinate;
			var cardData = this.props.graph.cards[cardIdForCoordinate]
			return (
				<Card
					key={cardIdForCoordinate}
					cardId={cardIdForCoordinate}
					cardData={cardData}
					x={x}
					y={y}
					width={cellWidth}
					selected={isSelected}/>
			);
		}
		else {
			var isDropping = dragCellCoordinates &&
				coordinate.x === dragCellCoordinates.x &&
				coordinate.y === dragCellCoordinates.y;

			return (
				<EmptyCell
					key={JSON.stringify(coordinate)}
					coordinate={coordinate}
					x={x}
					y={y}
					width={cellWidth}
					active={isDropping} />
			);
		}
	},


	getCardIdForCoordinate: function(coordinate) {
		var cardIdForCoordinate = null;
		_.find(this.props.graph.cards, function(cardData, cardId) {
			if (cardData.x === coordinate.x && cardData.y === coordinate.y) {
				cardIdForCoordinate = cardId;
				return true;
			}
			else {
				return false;
			}
		});
		return cardIdForCoordinate;
	},


	closestCellToDrag: function(cellsInView) {
		var grid         = this.props.grid;
		var windowHeight = grid.get("windowHeight");
		var windowWidth  = grid.get("windowWidth");
		var cellWidth    = grid.get("cellWidth");
		var transX       = grid.get("transX");
		var transY       = grid.get("transY");

		var dragX = this.props.drag.get("startX") + this.props.drag.get("offsetX");
		var dragY = this.props.drag.get("startY") + this.props.drag.get("offsetY");

		var offsetDragX = dragX + transX;
		var offsetDragY = dragY + transY;

		var cellX = Math.round(offsetDragX / cellWidth);
		var cellY = Math.round(offsetDragY / cellWidth);

		return {
			x: cellX,
			y: cellY
		};
	},


	/*
		Events
	*/

	handleBackgroundMouseDown: function() {
		selectionActions.clearSelection();
	},

});


module.exports = CardLayer;
