var _               = require("lodash");
var Immutable       = require("Immutable");
var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;
var SignalIndicator = require("../SignalIndicator/SignalIndicator.jsx");
var Droppable       = require("../../mixins/Droppable.jsx");
var Draggable       = require("../../mixins/Draggable.jsx");
var dragActions     = require("../../actions/dragActions.js");


var CardInput = React.createClass({

	mixins: [PureRenderMixin, Draggable, Droppable],


	render: function() {
		var signalActive = false;
		if (this.props.inputValue) {
			signalActive = true;
		}

		var isDropping = false;
		if (this.canHandleDrop(this.props.drag.get("dragData")) && this.props.drag.get("draggedOverComponent") === this) {
			isDropping = true;
		}

		var classes = classSet({
			CardInput: true,
			isDropping: isDropping,
		})
		return (
			<div className={classes}>
				<SignalIndicator isDropping={signalActive} />
				<div className="Label">
					{this.props.inputName}
				</div>
			</div>
		);
	},


	handleDrop: function(dragData) {
		if (this.canHandleDrop(dragData)) {
			dragActions.createLink(dragData.get("cardId"), this.props.cardId, this.props.inputName);
		}
	},


	canHandleDrop: function(dragData) {
		return dragData && dragData.get("type") === "output";
	},


	/*
		Events
	*/

	handleDragStart: function(e){
		this.startGlobalX = e.globalX;
		this.startGlobalY = e.globalY;
		dragActions.startDrag(Immutable.Map({
			type: "input",
			cardId: this.props.cardId,
			inputName: this.props.inputName,
		}), e.globalX, e.globalY, e.currentX - e.globalX, e.currentY - e.globalY);
	},


	handleDragMove: function(e){
		dragActions.continueDrag(e.currentTarget, e.globalX - this.startGlobalX, e.globalY - this.startGlobalY);
	},


	handleDragEnd: function(e){
		dragActions.endDrag();
	},

});


module.exports = CardInput;
