var _         = require("lodash");
var Reflux    = require("reflux");
var Immutable = require("Immutable");


var HoverStore = Reflux.createStore({

	init: function(){
		this.data_ = Immutable.fromJS({
			hoverCard: null
		});
	},


	getInitialState: function(){
		return this.data_;
	},


	setHoveredCard: function(cardId) {
		this.data_ = this.data_.set("hoverCard", cardId);
		this.trigger(this.data_);
	},

});


module.exports = HoverStore;
