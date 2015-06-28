var _         = require("lodash");
var Reflux    = require("reflux");
var Immutable = require("Immutable");


var GridStore = Reflux.createStore({

	init: function(){
		this.data_ = Immutable.Map({
		});
	},


	getInitialState: function(){
		return this.data_;
	},

});


module.exports = GridStore;
