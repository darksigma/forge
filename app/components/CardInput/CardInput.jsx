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
		var active = false;
		if (this.props.inputValue) {
			active = true;
		}

		return (
			<div className="CardInput">
				<SignalIndicator active={active} />
				<div className="Label">
					{this.props.inputName}
				</div>
			</div>
		);
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
