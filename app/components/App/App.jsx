var Reflux          = require("reflux");
var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;
var GridLayer       = require("../GridLayer/GridLayer.jsx")
var LinkLayer       = require("../LinkLayer/LinkLayer.jsx")
var CardLayer       = require("../CardLayer/CardLayer.jsx")
var GraphStore      = require("../../stores/GraphStore.js");


var App = React.createClass({

	mixins: [
		PureRenderMixin,
		Reflux.connect(GraphStore, "graph")
	],

	render: function() {
		return (
			<div className="App">
				<GridLayer graph={this.state.graph}/>
				<LinkLayer graph={this.state.graph}/>
				<CardLayer graph={this.state.graph}/>
			</div>
		);
	}

});


module.exports = App;
