var _ = require("lodash");


var Draggable = {

	getInitialState: function(){
		return {
			dragging: false
		}
	},


	componentDidMount: function() {
		this.dragging = false;
		this.startX = null;
		this.startY = null;

		var domNode = this.getDOMNode();

		if(this._isTouchBrowser()){
			domNode.addEventListener("touchstart", this.draggableTouchStart);
			window.addEventListener("touchmove", this.draggableTouchMove);
			window.addEventListener("touchend", this.draggableTouchEnd);
		}
		else {
			domNode.addEventListener("mousedown", this.draggableMouseDown);
			window.addEventListener("mousemove", this.draggableMouseMove);
			window.addEventListener("mouseup", this.draggableMouseUp);
		}
	},


	componentWillUnmount: function() {
		var domNode = this.getDOMNode();

		if(this._isTouchBrowser()){
			domNode.removeEventListener("touchstart", this.draggableTouchStart);
			window.removeEventListener("touchmove", this.draggableTouchMove);
			window.removeEventListener("touchend", this.draggableTouchEnd);
		}
		else {
			domNode.removeEventListener("mousedown", this.draggableMouseDown);
			window.removeEventListener("mousemove", this.draggableMouseMove);
			window.removeEventListener("mouseup", this.draggableMouseUp);
		}
	},


	/**
	* Mouse Events
	*/

	draggableMouseDown: function(e) {
		e.preventDefault();
		this._clearTextSelection();

		this.savedRect = this.getDOMNode().getBoundingClientRect();

		this.startX = this._offsetX(e.clientX, this.savedRect);
		this.startY = this._offsetY(e.clientY, this.savedRect);
		this.dragging = true;
		this.firedDragStart = false;

		this.setState({dragging: true});

	},


	draggableMouseMove: function(e) {
		if(this.dragging){
			e.preventDefault();

			if(!this.firedDragStart) {
				this.firedDragStart = true;
				if( _.isFunction(this.handleDragStart)){
					this.handleDragStart(this._getEventDetail(e));
				}
			}

			if(_.isFunction(this.handleDragMove)){
				this.handleDragMove(this._getEventDetail(e));
			}
		}
	},


	draggableMouseUp: function(e) {
		if(this.dragging){
			e.preventDefault();

			this.setState({dragging: false});

			if(_.isFunction(this.handleDragEnd)){
				this.handleDragEnd(null);
			}

			this.firedDragStart = false;
			this.dragging = false;
			this.savedRect = null;
			this.startX = null;
			this.startY = null;
		}
	},


	/**
	* Touch Events
	*/

	draggableTouchStart: function(e) {
		e.preventDefault();
		this._clearTextSelection();

		var firstTargetTouch = e.targetTouches[0];

		this.startX          = firstTargetTouch.clientX;
		this.startY          = firstTargetTouch.clientY;
		this.touchIdentifier = firstTargetTouch.identifier;
		this.dragging        = true;

		this.setState({dragging: true});

		if(_.isFunction(this.handleDragStart)){
			this.handleDragStart(this._getEventDetail(firstTargetTouch));
		}
	},


	draggableTouchMove: function(e) {
		if (this.dragging) {
			e.preventDefault();

			var touchWithIdentifier = _.find(e.touches, function(touch){
				return touch.identifier === this.touchIdentifier;
			}.bind(this));

			if(touchWithIdentifier && _.isFunction(this.handleDragMove)){
				var elementOverTouch = document.elementFromPoint(
					touchWithIdentifier.clientX,
					touchWithIdentifier.clientY
				);

				var detail = {
					clientX: touchWithIdentifier.clientX,
					clientY: touchWithIdentifier.clientY,
					target: elementOverTouch
				};

				this.handleDragMove(this._getEventDetail(detail));
			}
		}
	},


	draggableTouchEnd: function(e) {
		if (this.dragging) {
			e.preventDefault();

			this.setState({dragging: false});

			if(_.isFunction(this.handleDragEnd)){
				this.handleDragEnd(null);
			}

			this.dragging        = false;
			this.startX          = null;
			this.startY          = null;
			this.touchIdentifier = null;
		}
	},


	/**
	* Helpers
	*/

	_getEventDetail: function(e) {

		return {
			currentTarget: e.target,
			startX: this.startX,
			startY: this.startY,
			currentX: this._offsetX(e.clientX, this.savedRect),
			currentY: this._offsetY(e.clientY, this.savedRect),
			globalX: e.clientX,
			globalY: e.clientY
		};
	},


	_offsetX: function(x, thisRect){
		return x - thisRect.left;
	},


	_offsetY: function(y, thisRect){
		return y - thisRect.top;
	},


	_isTouchBrowser: function(){
		return ("ontouchstart" in window)
	},


	// Adapted from http://stackoverflow.com/a/3169849
	_clearTextSelection: function(){
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
	}

};


module.exports = Draggable
