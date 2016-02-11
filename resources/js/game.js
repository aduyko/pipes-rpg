var Game = function() {
	var self = this;
	this.loader = {};
	this.mouseHandler = {};
	this.debug = {};
	this.objects = [];
	this.state = 0;

	this.STATE_PAUSED = 0;
	this.STATE_ACTIVE = 1;

	this.init = function() {
		console.log("Initializing Game");
		self.loader = new Loader();
		self.mouseHandler = new MouseHandler();
		console.log(self.mouseHandler);
		self.mouseHandler.init();

		// debugging/testing functions
		if(undefined !== Debug) {
			console.log("Entering debug mode");
			self.debug = new Debug();
			self.debug.init(self);
		} else {
			console.log("Game initialized");
			self.loadData();	
		}
	}

	this.loadData = function() {

	}

	this.update = function() {

	}
}