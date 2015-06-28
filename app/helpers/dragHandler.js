var _ = require("lodash");


var DragHandler = function() {
	window.addEventListener("mousemove", this.mouseMove.bind(this));
	window.addEventListener("mouseup", this.mouseUp.bind(this));
};


DragHandler.prototype.mouseDownComponent = function(e, ownerComponent) {
	e.preventDefault();
	this.clearTextSelection();
	this.ownerComponent = ownerComponent;
	this.savedRect      = this.ownerComponent.getDOMNode().getBoundingClientRect();
	this.startX         = this.offsetX(e.clientX, this.savedRect);
	this.startY         = this.offsetY(e.clientY, this.savedRect);
	this.dragging       = true;
	this.firedDragStart = false;
};


DragHandler.prototype.mouseMove = function(e) {
	if(this.dragging){
		e.preventDefault();

		if(!this.firedDragStart) {
			this.firedDragStart = true;
			if(_.isFunction(this.ownerComponent.handleDragStart)){
				this.ownerComponent.handleDragStart(this.getEventDetail(e));
			}
		}

		if(_.isFunction(this.ownerComponent.handleDragMove)){
			this.ownerComponent.handleDragMove(this.getEventDetail(e));
		}
	}
};


DragHandler.prototype.mouseUp = function(e) {
	if(this.dragging){
		e.preventDefault();

		if(_.isFunction(this.ownerComponent.handleDragEnd)){
			this.ownerComponent.handleDragEnd(null);
		}

		this.firedDragStart = false;
		this.dragging = false;
		this.savedRect = null;
		this.startX = null;
		this.startY = null;
	}
};


DragHandler.prototype.getEventDetail = function(e) {
	return {
		currentTarget: e.target,
		startX: this.startX,
		startY: this.startY,
		currentX: this.offsetX(e.clientX, this.savedRect),
		currentY: this.offsetY(e.clientY, this.savedRect),
		globalX: e.clientX,
		globalY: e.clientY
	};
};


DragHandler.prototype.offsetX = function(x, thisRect){
	return x - thisRect.left;
};


DragHandler.prototype.offsetY = function(y, thisRect){
	return y - thisRect.top;
};


DragHandler.prototype.isTouchBrowser = function(){
	return ("ontouchstart" in window)
};


// Adapted from http://stackoverflow.com/a/3169849
DragHandler.prototype.clearTextSelection = function(){
	if (document.activeElement) {
		document.activeElement.blur();
	}

	if (window.getSelection) {
		if (window.getSelection().empty) {  // Chrome
			window.getSelection().empty();
		} else if (window.getSelection().removeAllRanges) {  // Firefox
			window.getSelection().removeAllRanges();
		}
	} else if (document.selection) {  // IE?
		document.selection.empty();
	}
};


module.exports = new DragHandler();
