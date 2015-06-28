var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;
var cardActions     = require("../../actions/cardActions.js");


var AddCardMenuOption = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		return (
			<div className="AddCardMenuOption" onClick={this.handleClick}>
				<img src={this.props.cardTypeData.icon} className="Icon" />
				<div className="Name">{this.props.cardTypeData.humanReadableName}</div>
			</div>
		);
	},


	handleClick: function(e) {
		cardActions.createCardAtCell(this.props.cardTypeName, this.props.coordinate);
	}

});


module.exports = AddCardMenuOption;
