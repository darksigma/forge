var _            = require("lodash");
var Reflux       = require("reflux");
var Immutable    = require("Immutable");
var Firebase     = require("firebase");
var globalConfig = require("../globalConfig.js");
var Promise      = require("promise");


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
		return new Promise(function(resolve, reject) {
			var cardRef = this.graphRef_.child("cards").child(cardId);
			cardRef.transaction(function(oldValue) {
				return _.assign({}, oldValue, update);
			}, resolve);
		}.bind(this));
	},


	createCard: function(cardData) {
		return new Promise(function(resolve, reject) {
			var cardsRef = this.graphRef_.child("cards");
			var newRef = cardsRef.push();
			newRef.set(cardData, function() {
				resolve(newRef.key());
			});
		}.bind(this));
	},


	setCardInput: function(cardId, inputName, inputValue) {
		return new Promise(function(resolve, reject) {
			var inputsRef = this.graphRef_.child("cards").child(cardId).child("inputs").child(inputName);
			inputsRef.set(inputValue, resolve);
		}.bind(this));
	},


	valueUpdated_: function(snapshot) {
		this.data_ = snapshot.val();
		this.trigger(this.data_);
	}

});


module.exports = GraphStore;
