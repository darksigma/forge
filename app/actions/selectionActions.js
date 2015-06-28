var _              = require("lodash");
var Reflux         = require("reflux");
var Immutable      = require("immutable");
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
			var cards         = GraphStore.getData().cards;
			var deletedCardId = selectedData.get("cardId");

			cardInputPairs = _.map(cards, function(cardValue, cardId) {
				return _.map(cardValue.inputs || [], function(inputValue, inputName) {
					return {
						cardId: cardId,
						inputName: inputName,
						inputValue: inputValue,
					}
				});
			});

			cardInputPairs = _.union.apply(null, cardInputPairs);

			pairsWithDeletedInput = _.filter(cardInputPairs, function(pair) {
				return pair.inputValue === deletedCardId;
			});

			Promise.all(_.map(pairsWithDeletedInput, function(pair) {
				return GraphStore.setCardInput(pair.cardId, pair.inputName, null);
			})).then(function() {
				return GraphStore.deleteCard(selectedData.get("cardId"));
			});
		}
		else if (selectedData && selectedData.get("type") === "input") {
			GraphStore.setCardInput(selectedData.get("cardId"), selectedData.get("inputName"), null);
		}
		resolve();
	}).done();
};


module.exports = selectionActions
