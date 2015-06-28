var _                = require("lodash");
var React            = require("react/addons");
var classSet         = React.addons.classSet;
var PureRenderMixin  = React.addons.PureRenderMixin;
var Card             = require("../Card/Card.jsx");
var EmptyCell        = require("../EmptyCell/EmptyCell.jsx");
var selectionActions = require("../../actions/selectionActions.js");
var gridHelpers      = require("../../helpers/gridHelpers.js");


var CardLayer = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		var _this = this;
		var cellsInView = gridHelpers.getCellsInView(this.props.grid);

		if (this.props.drag.get("cardId")) {
			var dragCellCoordinates = gridHelpers.closestCellToDrag(cellsInView, this.props.grid, this.props.drag);
		}

		var cells = _.map(cellsInView, function(coordinate) {
			return _this.renderCell(coordinate, dragCellCoordinates);
		});

		return (
			<div className="CardLayer">
				<div className="Cells">
					{_.compact(cells)}
				</div>
			</div>
		);
	},


	renderCell: function(coordinate, dragCellCoordinates) {
		var cellWidth  = this.props.grid.get("cellWidth");
		var x          = (coordinate.x * cellWidth) - this.props.grid.get("transX");
		var y          = (coordinate.y * cellWidth) - this.props.grid.get("transY");

		var cardIdForCoordinate = gridHelpers.getCardIdForCoordinate(coordinate, this.props.graph.cards);

		var isDraggingCard = false
		if (cardIdForCoordinate) {
			isDraggingCard = this.props.drag.get("cardId") === cardIdForCoordinate;
		}

		if (cardIdForCoordinate && !isDraggingCard) {
			var isSelected     = this.props.selection.get("selectedCard") === cardIdForCoordinate;
			var cardData       = this.props.graph.cards[cardIdForCoordinate];

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
					active={isDropping}
					grid={this.props.grid} />
			);
		}
	},


});

module.exports = CardLayer;
