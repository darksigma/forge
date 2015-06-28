var _         = require("lodash");
var Reflux    = require("reflux");
var Immutable = require("Immutable");


var HoverStore = Reflux.createStore({

	init: function(){
		this.data_ = Immutable.fromJS({
			hoverData: Immutable.Map({
			})
		});
	},


	getInitialState: function(){
		return this.data_;
	},


	setHoveredData: function(hoverData) {
		this.data_ = this.data_.set("hoverData", hoverData);
		this.trigger(this.data_);
	},

});


module.exports = HoverStore;
