var React           = require("react/addons");
var classSet        = React.addons.classSet;

var PureRenderMixin = React.addons.PureRenderMixin;

var ReactArt        = require("react-art");
var Surface         = ReactArt.Surface;
var Group           = ReactArt.Group;
var Rectangle       = require("../../../node_modules/react-art/shapes/rectangle.js");

var c               = require("../../helpers/color.js");

/*
 * Draws grid, handles highlighting cells
 */
var GridLayer = React.createClass({

	mixins: [
    PureRenderMixin,
  ],

  componentDidMount: function() {
  },


	render: function() {
    var grid = this.props.grid;
		var cards = this.props.graph.cards;
    var wWidth = grid.get("windowWidth");
    var wHeight = grid.get("windowHeight");

		return (
			<div className="GridLayer">
        <Surface
          width={wWidth}
          height={wHeight}>
					<Group x={0} y={0}>
						{this.drawActiveCells(grid, cards, c.activeCells)}
					</Group>
					<Group x={0} y={0}>
						{this.drawGrid(grid, c.grid)}
					</Group>
        </Surface>
			</div>
		);
	},

	drawActiveCells: function(grid, cards, color) {
		var cellSize = grid.get("cellWidth");
		var transX = grid.get("transX");
		var transY = grid.get("transY");

		// for each card, figure out their location by
		var highlights = [];
		for(key in cards) {
			var card = cards[key];
			var x = card.x*cellSize - transX;
			var y = card.y*cellSize - transY;
			// TODO don't show highlight offscreen
			highlights.push(this.drawActiveCell(cellSize, x, y, c.activeCell));
		}
		return highlights;
	},

	drawActiveCell: function(cellSize, x, y, color) {
		return(
			<Group x={x} y={y}>
				<Rectangle
					width={cellSize}
					height={cellSize}
					fill={color}
				/>
			</Group>
		);
	},

	drawGrid: function(grid, color) {
		var height    = grid.get("windowHeight");
		var width     = grid.get("windowWidth");
		var cellSize  = grid.get("cellWidth");
		var transX    = grid.get("transX");
		var transY    = grid.get("transY");
		var lineWidth = grid.get("lineWidth");

		var horizontalStart = (cellSize - transY)%cellSize;
		var verticalStart   = (cellSize - transX)%cellSize;

		var numVertical   = width/cellSize;
		var numHorizontal = height/cellSize;

		var lineWidthOffset = (lineWidth - 1)/2;
		var lines           = [];

		for(var i = 0; i < numHorizontal; i++) {
			lines.push(this.drawHorizontalLine(width, horizontalStart + i*cellSize - lineWidthOffset, lineWidth, color));
		}
		for(var i = 0; i < numVertical; i++) {
			lines.push(this.drawVerticalLine(height, verticalStart + i*cellSize - lineWidthOffset, lineWidth, color));
		}

		return lines;
	},

	drawVerticalLine: function(height, xOffset, lineWidth, color) {
		return(
			<Group x={xOffset} y={0}>
				<Rectangle
					width={lineWidth}
					height={height}
					fill={color}
				/>
			</Group>
		);
	},

	drawHorizontalLine: function(width, yOffset, lineWidth, color) {
		return(
			<Group x={0} y={yOffset}>
				<Rectangle
					width={width}
					height={lineWidth}
					fill={color}
				/>
			</Group>
		);
	},

});

module.exports = GridLayer;
