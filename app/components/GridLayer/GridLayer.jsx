var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;


var GridLayer = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		return (
			<div className="GridLayer">
			</div>
		);
	},

});


module.exports = GridLayer;
