var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;


var FunctionCard = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		return (
			<div className="FunctionCard">
			</div>
		);
	},

});


module.exports = FunctionCard;
