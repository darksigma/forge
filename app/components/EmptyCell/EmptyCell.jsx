var React            = require("react/addons");
var classSet         = React.addons.classSet;
var PureRenderMixin  = React.addons.PureRenderMixin;
var Draggable        = require("../../mixins/Draggable.jsx");
var selectionActions = require("../../actions/selectionActions.js");


var EmptyCell = React.createClass({

	mixins: [PureRenderMixin, Draggable],


	render: function() {
		var rootStyle = {
			width: this.props.width + "px",
			height: this.props.width + "px",
			transform: "translate(" + this.props.x + "px," + this.props.y + "px)"
		};

		var classes = classSet({
			EmptyCell: true,
			active: this.props.active
		});

		return (
			<div className={classes} style={rootStyle} onMouseDown={this.handleMouseDown}>
			</div>
		);
	},

	/*
		Events
	*/

	handleMouseDown: function() {
		selectionActions.clearSelection();
	},


	handleDragStart: function(e){
		// var thisRect = this.getDOMNode().getBoundingClientRect();
		// var startX = thisRect.left;
		// var startY = thisRect.top;
		// dragActions.startDrag(this.props.cardId, startX, startY, e.currentX - e.startX, e.currentY - e.startY);
	},


	handleDragMove: function(e){
		// dragActions.continueDrag(this.props.cardId, e.currentX - e.startX, e.currentY - e.startY);
	},


	handleDragEnd: function(e){
		// dragActions.endDrag(this.props.cardId);
	},

});


module.exports = EmptyCell;
