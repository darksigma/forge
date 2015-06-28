var React            = require("react/addons");
var classSet         = React.addons.classSet;
var PureRenderMixin  = React.addons.PureRenderMixin;
var Draggable        = require("../../mixins/Draggable.jsx");
var Droppable        = require("../../mixins/Droppable.jsx");
var selectionActions = require("../../actions/selectionActions.js");
var gridActions      = require("../../actions/gridActions.js");
var dragActions      = require("../../actions/dragActions.js");
var AddCardMenu      = require("../AddCardMenu/AddCardMenu.jsx")


var EmptyCell = React.createClass({

	mixins: [PureRenderMixin, Draggable, Droppable],

	getInitialState: function() {
		return {
			showAddCardMenu: false
		};
	},


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

		if (this.state.showAddCardMenu) {
			var addCardMenu = (
				<AddCardMenu />
			)
		}

		return (
			<div className={classes}
				style={rootStyle}
				onMouseDown={this.handleMouseDown}
				onDoubleClick={this.handleDoubleClick}>
				{addCardMenu}
			</div>
		);
	},


	handleDrop: function(dragData) {
		if (dragData && dragData.get("type") === "card") {
			dragActions.dropCardInCell(dragData.get("cardId"), this.props.coordinate);
		}
	},


	/*
		Events
	*/

	handleDoubleClick: function(e) {
		e.preventDefault();
		this.setState({
			showAddCardMenu: true
		});
	},


	handleMouseDown: function() {
		selectionActions.clearSelection();
	},


	handleDragStart: function(e){
		this.startTransX = this.props.grid.get("transX");
		this.startTransY = this.props.grid.get("transY");
	},


	handleDragMove: function(e){
		var offsetX = e.startX - e.currentX;
		var offsetY = e.startY - e.currentY;
		gridActions.setTranslate(this.startTransX + offsetX, this.startTransY + offsetY);
	},


});


module.exports = EmptyCell;
