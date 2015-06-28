var _               = require("lodash");
var Immutable       = require("immutable");
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

		var isDropping = false;
		if (this.canHandleDrop(this.props.drag.get("dragData")) && this.props.drag.get("draggedOverComponent") === this) {
			isDropping = true;
		}

		var classes = classSet({
			CardOutput: true,
			isDropping: isDropping,
		})
		return (
			<div className={classes}>
				<SignalIndicator active={foundInputsToThis} />
			</div>
		);
	},


	getVirtualLink: function() {
		var dragData = this.props.drag.get("dragData");
		if(!dragData) {
			return;
		}
		return {
			outputCardId: this.props.cardId,
			inputCardId: dragData.get("cardId"),
			inputName: dragData.get("inputName")
		};
	},


	handleDrop: function(dragData) {
		if (this.canHandleDrop(dragData)) {
			dragActions.createLink(this.props.cardId, dragData.get("cardId"), dragData.get("inputName"));
		}
	},


	canHandleDrop: function(dragData) {
		return dragData && dragData.get("type") === "input";
	},


	/*
		Events
	*/

	handleDragStart: function(e){
		this.startGlobalX = e.globalX;
		this.startGlobalY = e.globalY;
		dragActions.startDrag(Immutable.Map({
			type: "output",
			cardId: this.props.cardId,
		}), e.globalX, e.globalY, e.currentX - e.globalX, e.currentY - e.globalY);
	},


	handleDragMove: function(e){
		dragActions.continueDrag(e.currentTarget, e.globalX - this.startGlobalX, e.globalY - this.startGlobalY);
	},


	handleDragEnd: function(e){
		dragActions.endDrag();
	},

});


module.exports = CardOutput;
