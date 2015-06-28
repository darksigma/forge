var dragHandler = require("../helpers/dragHandler.js");


var Draggable = {

	componentDidMount: function() {
		var domNode = this.getDOMNode();
		domNode.addEventListener("mousedown", this.draggableMouseDown);
	},


	componentWillUnmount: function() {
		var domNode = this.getDOMNode();
		domNode.removeEventListener("mousedown", this.draggableMouseDown);
	},


	draggableMouseDown: function(e) {
		dragHandler.mouseDownComponent(e, this);
	},

};


module.exports = Draggable
