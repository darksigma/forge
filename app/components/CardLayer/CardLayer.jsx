var _                = require("lodash");
var React            = require("react/addons");
var classSet         = React.addons.classSet;
var PureRenderMixin  = React.addons.PureRenderMixin;
var Card             = require("../Card/Card.jsx");
var selectionActions = require("../../actions/selectionActions.js");
var gridHelpers      = require("../../helpers/gridHelpers.js");


var CardLayer = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		var _this = this;
		var cellsInView = gridHelpers.getCellsInView(this.props.grid);

		var cells = _.map(cellsInView, function(coordinate) {
			return _this.renderCell(coordinate);
		});

		return (
			<div className="CardLayer">
				{_.compact(cells)}
			</div>
		);
	},


	renderCell: function(coordinate) {
		var cellWidth  = this.props.grid.get("cellWidth");
		var x          = (coordinate.x * cellWidth) - this.props.grid.get("transX");
		var y          = (coordinate.y * cellWidth) - this.props.grid.get("transY");

		var cardIdForCoordinate = gridHelpers.getCardIdForCoordinate(coordinate, this.props.graph.cards);

		var dragData       = this.props.drag.get("dragData")
		var isDraggingCard = false
		if (cardIdForCoordinate && dragData) {
			isDraggingCard = dragData.get("type") === "card" && dragData.get("cardId") === cardIdForCoordinate;
		}

		if (cardIdForCoordinate && !isDraggingCard) {
			var selectedData = this.props.selection.get("selectedData");
			var isSelected   = selectedData.get("type") === "card" && selectedData.get("cardId") === cardIdForCoordinate;
			var isHovered      = this.props.hover.get("hoverCard") === cardIdForCoordinate;
			var cardData       = this.props.graph.cards[cardIdForCoordinate];

			return (
				<Card
					key={cardIdForCoordinate}
					cardId={cardIdForCoordinate}
					cardData={cardData}
					x={x}
					y={y}
					width={cellWidth}
					selected={isSelected}
					hovered={isHovered}
					graph={this.props.graph}
					drag={this.props.drag} />
			);
		}
	},

});

module.exports = CardLayer;
