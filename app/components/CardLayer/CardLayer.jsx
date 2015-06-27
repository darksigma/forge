var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;


var CardLayer = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		return (
			<div className="CardLayer">
			</div>
		);
	},

});


module.exports = CardLayer;
