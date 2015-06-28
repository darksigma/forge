var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;


var AddCardMenuOption = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		return (
			<div className="AddCardMenuOption">
				<img src={this.props.cardTypeData.icon} className="Icon" />
				<div className="Name">{this.props.cardTypeData.humanReadableName}</div>
			</div>
		);
	},

});


module.exports = AddCardMenuOption;
