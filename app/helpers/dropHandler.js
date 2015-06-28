var _ = require("lodash");


var DropHandler = function() {
	this.registeredComponents_ = [];
};


DropHandler.prototype.getComponents = function() {
	return this.registeredComponents_;
};


DropHandler.prototype.registerComponent = function(component) {
	this.registeredComponents_ = _.union(this.registeredComponents_, [component]);
};


DropHandler.prototype.unRegisterComponent = function(component) {
	this.registeredComponents_ = _.without(this.registeredComponents_, component);
};


module.exports = new DropHandler();
