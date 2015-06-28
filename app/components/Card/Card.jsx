var _                = require("lodash");
var Immutable        = require("Immutable");
var React            = require("react/addons");
var classSet         = React.addons.classSet;
var PureRenderMixin  = React.addons.PureRenderMixin;
var cardTypes        = require("../../cardTypes.js");
var FunctionCard     = require("../FunctionCard/FunctionCard.jsx")
var VariableCard     = require("../VariableCard/VariableCard.jsx")
var RequestCard      = require("../RequestCard/RequestCard.jsx")
var Draggable        = require("../../mixins/Draggable.jsx");
var CardOutput       = require("../CardOutput/CardOutput.jsx")
var selectionActions = require("../../actions/selectionActions.js");
var hoverActions     = require("../../actions/hoverActions.js");
var dragActions      = require("../../actions/dragActions.js");


var Card = React.createClass({

	mixins: [PureRenderMixin, Draggable],

	cardClassRendererMap: {
		"function": FunctionCard,
		"variable": VariableCard,
		"request": RequestCard,
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
			hovered: this.props.hovered,
		});

		var lambdaType = cardTypes[this.props.cardData.type];

		return (
			<div className={classes} style={rootStyle} onMouseOver={this.onMouseEnter} onMouseDown={this.handleMouseDown}>
				<div className="CardInner">
					<div className="Header">
						<img className="Icon" src={lambdaType.icon} />
						<div className="Name">{this.getCardName()}</div>
						<CardOutput
							graph={this.props.graph}
							cardId={this.props.cardId}
							drag={this.props.drag} />
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
				<Handler
					cardId={this.props.cardId}
					cardData={this.props.cardData}
					graph={this.props.graph}
					drag={this.props.drag} />
			)
		}
	},


	/*
		Events
	*/

	handleMouseDown: function() {
		selectionActions.selectCard(this.props.cardId);
		//hoverActions.clearHover();
	},


	onMouseEnter: function() {
		hoverActions.hoverCard(this.props.cardId);
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
		dragActions.continueDrag(e.currentTarget, e.currentX - e.startX, e.currentY - e.startY);
	},


	handleDragEnd: function(e){
		dragActions.endDrag();
	},


});


module.exports = Card;
