var _         = require("lodash");
var Reflux    = require("reflux");
var Immutable = require("Immutable");


var GridStore = Reflux.createStore({

	init: function(){
		this.data_ = Immutable.Map({
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight,
			transY: -100,
			transX: -100,
      cellWidth: 200,
			lineWidth: 3,
		});

		var debounced = _.debounce(this.handleResize_.bind(this), 200)
		window.addEventListener("resize", debounced);
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


	handleResize_: function(e) {
		this.data_ = this.data_.set("windowWidth", window.innerWidth);
		this.data_ = this.data_.set("windowHeight", window.innerHeight);
		this.trigger(this.data_);
	},

});


module.exports = GridStore;
