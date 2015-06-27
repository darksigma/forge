var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;


var SignalIndicator = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		return (
			<div className="SignalIndicator">
			</div>
		);
	},

});


module.exports = SignalIndicator;
