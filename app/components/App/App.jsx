var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;
var GridLayer       = require("../GridLayer/GridLayer.jsx")
var LinkLayer       = require("../LinkLayer/LinkLayer.jsx")
var CardLayer       = require("../CardLayer/CardLayer.jsx")


var App = React.createClass({

	render: function() {
		return (
			<div className="App">
				<GridLayer />
				<LinkLayer />
				<CardLayer />
			</div>
		);
	}

});


module.exports = App;
