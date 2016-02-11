var Debug = function() {
	var self = this;
	this.game = {};

	var DraggableColorTile = function() {
		this.color = "red";
		this.left = 0;
		this.top = 0;
		this.width = 32;
		this.height = 32;
		this.domElement = null;

		this.state = 0;
		this.STATE_DEFAULT = 0;
		this.STATE_HOVER = 1;
		this.STATE_DRAG = 2;

		this.init = function() {
			this.domElement = document.createElement("div");
			this.domElement.className = "tile";
			this.updateColor("red");
			this.updatePosition(0,0);
			this.domElement.style.width = this.width;
			this.domElement.style.height = this.height;
		}
		this.updateColor = function(color) {
			this.color = color;
			this.domElement.style.backgroundColor = color;
		}
		this.updatePosition = function(left,top) {
			this.left = left;
			this.top = top;
			this.domElement.style.left = (this.left - this.width/2) + "px";
			this.domElement.style.top = (this.top - this.height/2) + "px";
		}
		this.isHovered = function(mouseX,mouseY) {
			var hoveredX = this.left <= mouseX && (this.left + this.width) >= mouseX;
			var hoveredY = this.top <= mouseY && (this.top + this.height) >= mouseY;
			if(hoveredX && hoveredY) {
				if (this.state == this.STATE_DEFAULT) {
					this.state = this.STATE_HOVER;
					this.updateColor("yellow");
				}
			} else if(this.state == this.STATE_HOVER) {
				this.state = this.STATE_DEFAULT;
				this.updateColor("red");
			}
			return (hoveredX && hoveredY);
		}
	}
	
	this.init = function(Game) {
		self.game = Game;
		self.testDragging();
	}

	this.testDragging = function() {
		var canvas = document.getElementById('wrapper');
		console.log(canvas);
		var debugTile = self.createDebugTile();
		canvas.appendChild(debugTile.domElement);
		self.game.objects = [debugTile];
		self.game.update = function() {
			var mouseX = self.game.mouseHandler.x;
			var mouseY = self.game.mouseHandler.y;
			var oldMouseState = self.game.mouseHandler.previousState;
			var mouseState = self.game.mouseHandler.state;
			console.log(mouseX,mouseY,oldMouseState,mouseState);
			console.log(self.game.objects);	
			for(var i=0;i<self.game.objects.length;i++) {
				var currentObject = self.game.objects[i];
				if(currentObject.state == currentObject.STATE_DRAG) {
					currentObject.updatePosition(mouseX,mouseY);
				}
				if(currentObject.isHovered(mouseX,mouseY)) {
					switch(mouseState) {
						case self.game.mouseHandler.STATE_MOUSEDOWN:
							self.game.mouseHandler.state = self.game.mouseHandler.STATE_DRAGGING;
							currentObject.state = currentObject.STATE_DRAG;
							currentObject.updateColor("blue");
							currentObject.updatePosition(mouseX,mouseY);
							break;						
						case self.game.mouseHandler.STATE_DEFAULT:
							if(oldMouseState==self.game.mouseHandler.STATE_DRAGGING) {
								currentObject.state = currentObject.STATE_HOVER;
								currentObject.updateColor("yellow");
							}
							break;
					}
				}
			}
		};
		window.setInterval(function(){
			self.game.update();
		}, 16.667);
	}

	this.createDebugTile = function() {
		var tile = new DraggableColorTile();
		tile.init();
		return tile;
	}
}