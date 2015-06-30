var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;


var ScrollLayer = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		var rootStyle = {
			transform: "translate(" + (-1 * this.props.x) + "px," + (-1 * this.props.y) + "px)"
		};

		return (
			<div className="ScrollLayer" style={rootStyle}>
				{this.props.children}
			</div>
		);
	},

});


module.exports = ScrollLayer;
