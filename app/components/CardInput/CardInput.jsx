var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;


var CardInput = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		return (
			<div className="CardInput">
				<div className="Label">
					{this.props.inputName}
				</div>
			</div>
		);
	},

});


module.exports = CardInput;
