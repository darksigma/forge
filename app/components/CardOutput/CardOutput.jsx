var _               = require("lodash");
var Immutable       = require("Immutable");
var React           = require("react/addons");
var SignalIndicator = require("../SignalIndicator/SignalIndicator.jsx");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;


var CardOutput = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		var foundInputsToThis = _.any(this.props.graph.cards, function(cardData, cardId) {
			if (cardData.inputs) {
				return _.any(cardData.inputs, function(inputsTo, name){
					return inputsTo === this.props.cardId;
				}.bind(this));
			}
			else {
				return false
			}
		}.bind(this));

		return (
			<div className="CardOutput">
				<SignalIndicator active={foundInputsToThis} />
			</div>
		);
	},

});


module.exports = CardOutput;
