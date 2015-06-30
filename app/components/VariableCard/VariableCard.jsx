var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;
var cardActions     = require("../../actions/cardActions.js");


var VariableCard = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		return (
			<div className="VariableCard">
				<textarea
					ref="input"
					className="Input IgnoreDrag"
					value={this.props.cardData.value}
					onChange={this.handleChange}>
				</textarea>
			</div>
		);
	},


	handleChange: function(e) {
		var input = this.refs.input.getDOMNode();
		cardActions.editCardVariable(this.props.cardId, input.value);
	},

});


module.exports = VariableCard;
