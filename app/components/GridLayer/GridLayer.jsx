var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;

var ReactArt        = require("react-art");
var Surface         = ReactArt.Surface;

var Reflux          = require("reflux");
var GridStore       = require("../../stores/GridStore.js");

var color           = require("../../helpers/color.js");

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

    console.log(color.gridGrey);

		return (
			<div className="GridLayer">
        <div style={{width: '200px', height: '200px'}}></div>
        <Surface
          width={wWidth}
          height={wHeight}>
          {this.renderGraphic(grid)}
        </Surface>
			</div>
		);
	},

  renderGraphic: function(grid) {
  },

});


module.exports = GridLayer;
