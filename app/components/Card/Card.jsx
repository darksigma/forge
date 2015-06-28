var _                = require("lodash");
var Immutable        = require("Immutable");
var React            = require("react/addons");
var classSet         = React.addons.classSet;
var PureRenderMixin  = React.addons.PureRenderMixin;
var cardTypes        = require("../../cardTypes.js");
var FunctionCard     = require("../FunctionCard/FunctionCard.jsx")
var VariableCard     = require("../VariableCard/VariableCard.jsx")
var Draggable        = require("../../mixins/Draggable.jsx");
var SignalIndicator  = require("../SignalIndicator/SignalIndicator.jsx")
var selectionActions = require("../../actions/selectionActions.js");
var dragActions      = require("../../actions/dragActions.js");


var Card = React.createClass({

	mixins: [PureRenderMixin, Draggable],

	cardClassRendererMap: {
		"function": FunctionCard,
		"variable": VariableCard,
	},


	render: function() {
		var rootStyle = {
			width: this.props.width + "px",
			height: this.props.width + "px",
			transform: "translate(" + this.props.x + "px," + this.props.y + "px)"
		};

		var classes = classSet({
			Card: true,
			selected: this.props.selected,
		});

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
			<div className={classes} style={rootStyle} onMouseDown={this.handleMouseDown}>
				<div className="CardInner">
					<div className="Header">
						<div className="Icon"></div>
						<div className="Name">{this.getCardName()}</div>
						<SignalIndicator active={foundInputsToThis} />
					</div>
					<div className="CardUI">
						{this.renderCardClass()}
					</div>
				</div>
			</div>
		);
	},


	getCardName: function() {
		var lambdaType = cardTypes[this.props.cardData.type];
		if (lambdaType) {
			return lambdaType.humanReadableName;
		}
		else {
			return "Unknown Card";
		}
	},


	renderCardClass: function() {
		var lambdaType = cardTypes[this.props.cardData.type];
		if (lambdaType) {
			Handler = this.cardClassRendererMap[lambdaType.cardClass];

			return (
				<Handler cardData={this.props.cardData}/>
			)
		}
	},


	/*
		Events
	*/

	handleMouseDown: function() {
		selectionActions.selectCard(this.props.cardId);
	},


	handleDragStart: function(e){
		var thisRect = this.getDOMNode().getBoundingClientRect();
		var startX = thisRect.left + thisRect.width / 2;
		var startY = thisRect.top + thisRect.width / 2;
		dragActions.startDrag(Immutable.Map({
			type: "card",
			cardId: this.props.cardId
		}), startX, startY, e.currentX - e.startX, e.currentY - e.startY);
	},


	handleDragMove: function(e){
		dragActions.continueDrag(e.currentX - e.startX, e.currentY - e.startY);
	},


	handleDragEnd: function(e){
		dragActions.endDrag();
	},


});


module.exports = Card;
