var SelectionStore = require("../stores/SelectionStore.js");
var Promise        = require("promise");


var selectionActions = {}


selectionActions.clearSelection = function() {
	return new Promise(function(resolve, reject) {
		SelectionStore.setSelectedCard(null);
		resolve();
	});
};


selectionActions.selectCard = function(cardId) {
	return new Promise(function(resolve, reject) {
		SelectionStore.setSelectedCard(cardId);
		resolve();
	});
};


module.exports = selectionActions
