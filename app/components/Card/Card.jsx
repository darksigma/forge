var React            = require("react/addons");
var classSet         = React.addons.classSet;
var PureRenderMixin  = React.addons.PureRenderMixin;
var cardTypes        = require("../../../cardTypes.js");
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

		return (
			<div className={classes} style={rootStyle} onMouseDown={this.handleMouseDown}>
				<div className="CardInner">
					<div className="Header">
						<div className="Icon"></div>
						<div className="Name">{this.getCardName()}</div>
						<SignalIndicator active={true} />
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
		var startX = thisRect.left;
		var startY = thisRect.top;
		dragActions.startDrag(this.props.cardId, startX, startY, e.currentX - e.startX, e.currentY - e.startY);
	},


	handleDragMove: function(e){
		dragActions.continueDrag(this.props.cardId, e.currentX - e.startX, e.currentY - e.startY);
	},


	handleDragEnd: function(e){
		dragActions.endDrag(this.props.cardId);
	},


});


module.exports = Card;
