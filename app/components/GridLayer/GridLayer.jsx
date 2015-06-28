var _               = require("lodash");
var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;
var Reflux          = require("reflux");
var GridStore       = require("../../stores/GridStore.js");
var c               = require("../../helpers/color.js");
var gridHelpers     = require("../../helpers/gridHelpers.js");
var EmptyCell       = require("../EmptyCell/EmptyCell.jsx");


/*
 * Draws grid, handles highlighting cells
 */
var GridLayer = React.createClass({

	mixins: [
    PureRenderMixin,
  ],


	render: function() {
		var _this       = this;
		var cellsInView = gridHelpers.getCellsInView(this.props.grid);

		if (this.props.drag.get("cardId")) {
			var dragCellCoordinates = gridHelpers.closestCellToDrag(cellsInView, this.props.grid, this.props.drag);
		}

		var cells = _.map(cellsInView, function(coordinate) {
			return _this.renderCell(coordinate, dragCellCoordinates);
		});

		return (
			<div className="GridLayer">
        {_.compact(cells)}
			</div>
		);
	},


	renderCell: function(coordinate, dragCellCoordinates) {
		var cellWidth  = this.props.grid.get("cellWidth");
		var x          = (coordinate.x * cellWidth) - this.props.grid.get("transX");
		var y          = (coordinate.y * cellWidth) - this.props.grid.get("transY");

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
	},

});


module.exports = GridLayer;
