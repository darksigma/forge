var _         = require("lodash");
var Reflux    = require("reflux");
var Immutable = require("Immutable");


var SelectionStore = Reflux.createStore({

	init: function(){
		this.data_ = Immutable.fromJS({
			selectedCard: null
		});
	},


	getInitialState: function(){
		return this.data_;
	},


	setSelectedCard: function(cardId) {
		this.data_ = this.data_.set("selectedCard", cardId);
		this.trigger(this.data_);
	},

});


module.exports = SelectionStore;
