var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;


var VariableCard = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		return (
			<div className="VariableCard">
			</div>
		);
	},

});


module.exports = VariableCard;
