var _         = require("lodash");
var Reflux    = require("reflux");
var Immutable = require("Immutable");


var DragStore = Reflux.createStore({

	init: function(){
		this.data_ = Immutable.Map({});
	},


	getInitialState: function(){
		return this.data_;
	},


	getData: function() {
		return this.data_;
	},


	updateData: function(update) {
		this.data_ = this.data_.merge(update);
		this.trigger(this.data_);
	},

});


module.exports = DragStore;
