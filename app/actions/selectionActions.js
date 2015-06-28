var _              = require("lodash");
var Reflux         = require("reflux");
var Immutable      = require("Immutable");
var SelectionStore = require("../stores/SelectionStore.js");
var Promise        = require("promise");


var selectionActions = {}


selectionActions.clearSelection = function() {
	return new Promise(function(resolve, reject) {
		SelectionStore.setSelectedData(Immutable.Map());
		resolve();
	});
};


selectionActions.selectCard = function(cardId) {
	return new Promise(function(resolve, reject) {
		SelectionStore.setSelectedData(Immutable.Map({
			type: "card",
			cardId: cardId
		}));
		resolve();
	});
};


selectionActions.selectLink = function(cardId, inputName) {
	return new Promise(function(resolve, reject) {
		SelectionStore.setSelectedData(Immutable.Map({
			type: "input",
			cardId: cardId,
			inputName: inputName
		}));
		resolve();
	});
};


module.exports = selectionActions
