var _              = require("lodash");
var Reflux         = require("reflux");
var Immutable      = require("Immutable");
var SelectionStore = require("../stores/SelectionStore.js");
var Promise        = require("promise");
var GraphStore     = require("../stores/GraphStore.js");


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


selectionActions.deleteSelection = function() {
	return new Promise(function(resolve, reject) {
		var selectedData = SelectionStore.getData().get("selectedData");
		if (selectedData && selectedData.get("type") === "card") {
			GraphStore.deleteCard(selectedData.get("cardId"));
		}
		else if (selectedData && selectedData.get("type") === "input") {
			GraphStore.setCardInput(selectedData.get("cardId"), selectedData.get("inputName"), null);
		}
		resolve();
	}).done();
};


module.exports = selectionActions
