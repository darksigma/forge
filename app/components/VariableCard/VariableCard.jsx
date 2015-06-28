var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;
var cardActions     = require("../../actions/cardActions.js");


var VariableCard = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		return (
			<div className="VariableCard">
				<input className="Input IgnoreDrag" defaultValue={this.props.cardData.value} onKeyDown={this.handleInputKeyDown}></input>
			</div>
		);
	},


	handleInputKeyDown: function(e) {
		if (e.keyCode === 13) {
			cardActions.editCardVariable(this.props.cardId, e.target.value);
		}
	},

});


module.exports = VariableCard;
