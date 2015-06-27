var _         = require("lodash");
var Reflux    = require("reflux");
var Immutable = require("Immutable");


var GridStore = Reflux.createStore({

	init: function(){
		this.data_ = Immutable.Map({
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight,
			transY: 300,
			transX: 300,
      cellWidth: 200,
			lineWidth: 3,
		});
	},


	getInitialState: function(){
		return this.data_;
	},


});


module.exports = GridStore;
