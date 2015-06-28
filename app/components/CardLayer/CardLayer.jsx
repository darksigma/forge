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
		return (
			<div className="CardLayer">
				<div className="Background" onMouseDown={this.handleBackgroundMouseDown}></div>
				<div className="Cells">
					{_.map(this.getCellsInView(), this.renderCell)}
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


	renderCell: function(coordinate) {
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
			return (
				<EmptyCell
					key={JSON.stringify(coordinate)}
					coordinate={coordinate}
					x={x}
					y={y}
					width={cellWidth} />
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


	/*
		Events
	*/

	handleBackgroundMouseDown: function() {
		selectionActions.clearSelection();
	},

});


module.exports = CardLayer;
