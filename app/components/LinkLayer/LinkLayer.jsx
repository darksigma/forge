var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;


var LinkLayer = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		return (
			<div className="LinkLayer">
			</div>
		);
	},

});


module.exports = LinkLayer;
