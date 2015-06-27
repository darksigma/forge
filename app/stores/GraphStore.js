var _            = require("lodash");
var Reflux       = require("reflux");
var Immutable    = require("Immutable");
var Firebase     = require("firebase");
var globalConfig = require("../../globalConfig.js");


var GraphStore = Reflux.createStore({

	init: function(){
		this.firebaseRoot_ = new Firebase(globalConfig.firebaseUrl);
		this.data_         = Immutable.Map({});
	},


	getInitialState: function(){
		return this.data_;
	},


});


module.exports = GraphStore;
