var GridStore = require("../stores/GridStore.js");
var Promise   = require("promise");
var Immutable = require("immutable");


var gridActions = {}


gridActions.setTranslate = function(transX, transY) {
	return new Promise(function(resolve, reject) {
		GridStore.updateData(Immutable.Map({
			transX: transX,
			transY: transY,
		}));
		resolve();
	});
};


module.exports = gridActions
