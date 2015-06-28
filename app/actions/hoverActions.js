var HoverStore = require("../stores/HoverStore.js");
var Promise        = require("promise");


var hoverActions = {}


hoverActions.clearHover = function() {
	return new Promise(function(resolve, reject) {
		HoverStore.setHoveredCard(null);
		resolve();
	});
};


hoverActions.hoverCard = function(cardId) {
	return new Promise(function(resolve, reject) {
		HoverStore.setHoveredCard(cardId);
		resolve();
	});
};


module.exports = hoverActions
