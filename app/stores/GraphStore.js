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

		this.graphRef_.on("value", this.valueUpdated_.bind(this));
	},


	getInitialState: function(){
		return {
			cards: {}
		};
	},


	valueUpdated_: function(snapshot) {
		this.trigger(snapshot.val());
	}

});


module.exports = GraphStore;
