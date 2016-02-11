var MouseHandler = function() {
	var self = this;
	this.previousState = 0;
	this.state = 0;
	this.STATE_DEFAULT = 0;
	this.STATE_MOUSEDOWN = 1;
	this.STATE_DRAGGING = 2;
	this.x = 0;
	this.y = 0;

	this.init = function() {
		document.addEventListener("mousedown", self.mouseDownHandler);
		document.addEventListener("mouseup", self.mouseUpHandler);
		document.addEventListener("mousemove", self.mouseMoveHandler);
	}
	this.mouseDownHandler = function(event) {
		self.updateState(self.STATE_MOUSEDOWN);
	}
	this.mouseUpHandler = function(event) {
		self.updateState(self.STATE_DEFAULT);
	}
	this.updateState = function(newState) {
		self.previousState = self.state;
		self.state = newState;
	}
	this.mouseMoveHandler = function(event) {
		self.x = event.pageX;
		self.y = event.pageY;
	}
}