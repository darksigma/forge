var _            = require("lodash");
var Reflux       = require("reflux");
var Immutable    = require("Immutable");
var Firebase     = require("firebase");
var globalConfig = require("../globalConfig.js");


var GraphStore = Reflux.createStore({

	init: function(){
		this.firebaseRoot_ = new Firebase(globalConfig.firebaseUrl);
		this.graphId_      = window.location.pathname.substr(1);
		this.graphRef_     = this.firebaseRoot_.child("graphs").child(this.graphId_);
		this.lastSnapshot_ = null;
		this.data_ = {
			cards: {}
		};

		this.graphRef_.on("value", this.valueUpdated_.bind(this));
	},


	getInitialState: function(){
		return this.data_;
	},


	getData: function() {
		return this.data_;
	},


	updateCardData: function(cardId, update) {
		var cardRef = this.graphRef_.child("cards").child(cardId);
		cardRef.transaction(function(oldValue) {
			return _.assign({}, oldValue, update);
		});
	},


	setCardInput: function(cardId, inputName, inputValue) {
		var inputsRef = this.graphRef_.child("cards").child(cardId).child("inputs").child(inputName);
		inputsRef.set(inputValue);
	},


	valueUpdated_: function(snapshot) {
		this.data_ = snapshot.val();
		this.trigger(this.data_);
	}

});


module.exports = GraphStore;
