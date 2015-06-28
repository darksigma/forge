var Reflux          = require("reflux");
var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;
var GridLayer       = require("../GridLayer/GridLayer.jsx")
var LinkLayer       = require("../LinkLayer/LinkLayer.jsx")
var CardLayer       = require("../CardLayer/CardLayer.jsx")
var DragLayer       = require("../DragLayer/DragLayer.jsx")

var GraphStore      = require("../../stores/GraphStore.js");
var GridStore       = require("../../stores/GridStore.js");
var SelectionStore  = require("../../stores/SelectionStore.js");
var DragStore       = require("../../stores/DragStore.js");


var App = React.createClass({

	mixins: [
		PureRenderMixin,
		Reflux.connect(GraphStore, "graph"),
		Reflux.connect(GridStore, "grid"),
		Reflux.connect(SelectionStore, "selection"),
		Reflux.connect(DragStore, "drag"),
	],

	render: function() {
		return (
			<div className="App">
				<GridLayer graph={this.state.graph} grid={this.state.grid} selection={this.state.selection} drag={this.state.drag} />
				<LinkLayer graph={this.state.graph} grid={this.state.grid} selection={this.state.selection} drag={this.state.drag} />
				<CardLayer graph={this.state.graph} grid={this.state.grid} selection={this.state.selection} drag={this.state.drag} />
				<DragLayer graph={this.state.graph} grid={this.state.grid} selection={this.state.selection} drag={this.state.drag} />
				<img className="Logo" src="/assets/forge.svg"></img>
			</div>
		);
	}

});


module.exports = App;
