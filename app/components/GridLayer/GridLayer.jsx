var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;

var ReactArt        = require("react-art");
var Surface         = ReactArt.Surface;
var Group           = ReactArt.Group;
var Shape           = ReactArt.Shape;
var Rectangle       = require("../../../node_modules/react-art/shapes/rectangle.js");

var Reflux          = require("reflux");
var GridStore       = require("../../stores/GridStore.js");

var c               = require("../../helpers/color.js");

/*
 * Draws grid, handles highlighting cells
 */
var GridLayer = React.createClass({

	mixins: [
    PureRenderMixin,
    Reflux.connect(GridStore, "grid")
  ],

  componentDidMount: function() {
  },


	render: function() {
    var grid = this.state.grid;
    var wWidth = grid.get("windowWidth");
    var wHeight = grid.get("windowHeight");

		return (
			<div className="GridLayer">
        <Surface
          width={wWidth}
          height={wHeight}>
          {this.renderGraphic(grid, c)}
        </Surface>
			</div>
		);
	},

  renderGraphic: function(grid, c) {
		console.log(Rectangle);
		return drawGrid(grid);
  },

	drawVerticalLine: function(height) {
		return(
			<Group x={0} y={0}>
				<Rectangle
					width={3}
					height={height}
					fill={c.gridGrey}
				/>
			</Group>
		);
	},

	drawHorizontalLine: function() {
	},

	drawGrid: function(grid) {
		var height = grid.get("windowHeight");
		var width = grid.get("windowWidth");
		var cellSize = grid.get("cellWidth");
	},

});

var BG_PATH = "M3.00191459,1 C1.34400294,1 0,2.34785514 0,4.00550479 L0,217.994495 C0,219.65439 1.34239483,221 3.00191459,221 L276.998085,221 C278.655997,221 280,219.652145 280,217.994495 L280,4.00550479 C280,2.34561033 278.657605,1 276.998085,1 L3.00191459,1 Z M3.00191459,1";

var BAR_PATH = "M3.00191459,0 C1.34400294,0 0,1.34559019 0,3.00878799 L0,21 C0,21 0,21 0,21 L280,21 C280,21 280,21 280,21 L280,3.00878799 C280,1.34708027 278.657605,0 276.998085,0 L3.00191459,0 Z M3.00191459,0";

var BORDER_PATH = "M3.00191459,4 C1.34400294,4 0,5.34785514 0,7.00550479 L0,220.994495 C0,222.65439 1.34239483,224 3.00191459,224 L276.998085,224 C278.655997,224 280,222.652145 280,220.994495 L280,7.00550479 C280,5.34561033 278.657605,4 276.998085,4 L3.00191459,4 Z M3.00191459,4";

module.exports = GridLayer;
