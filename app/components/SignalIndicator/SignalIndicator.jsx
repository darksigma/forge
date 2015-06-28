var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;


var SignalIndicator = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		var classes = classSet({
			SignalIndicator: true,
			active: this.props.active,
		})
		return (
			<div className={classes}>
			</div>
		);
	},

});


module.exports = SignalIndicator;
