var dropHandler = require("../helpers/dropHandler.js");


var Droppable = {

	componentDidMount: function() {
		dropHandler.registerComponent(this);
	},


	componentWillUnmount: function() {
		dropHandler.unRegisterComponent(this);
	},

};


module.exports = Droppable
