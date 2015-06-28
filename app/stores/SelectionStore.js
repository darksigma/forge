var _         = require("lodash");
var Reflux    = require("reflux");
var Immutable = require("immutable");


var SelectionStore = Reflux.createStore({

	init: function(){
		this.data_ = Immutable.fromJS({
			selectedData: Immutable.Map({
			})
		});
	},


	getInitialState: function(){
		return this.data_;
	},


	getData: function() {
		return this.data_;
	},


	setSelectedData: function(selectedData) {
		this.data_ = this.data_.set("selectedData", selectedData);
		this.trigger(this.data_);
	},

});


module.exports = SelectionStore;
