var _               = require("lodash");
var Immutable       = require("Immutable");
var React           = require("react/addons");
var SignalIndicator = require("../SignalIndicator/SignalIndicator.jsx");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;
var Droppable       = require("../../mixins/Droppable.jsx");
var Draggable       = require("../../mixins/Draggable.jsx");
var dragActions     = require("../../actions/dragActions.js");


var CardOutput = React.createClass({

	mixins: [PureRenderMixin, Draggable, Droppable],

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


	handleDrop: function(dragData) {
		if (dragData && dragData.get("type") === "input") {
			dragActions.createLink(this.props.cardId, dragData.get("cardId"), dragData.get("inputName"));
		}
	},

});


module.exports = CardOutput;
