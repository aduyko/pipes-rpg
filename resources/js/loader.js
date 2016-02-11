var Loader = function(basePath) {
  var self = this;
  this.data = {};
  this.queue = [];
  this.queuedCount = 0;
  this.basePath = basePath;

  this.queueFiles = function(files) {
    for(var key in files) { 
      if (files.hasOwnProperty(key)) {
        self.queueFile(key, files[key].src, files[key].type);
      }
    }
  }

  this.queueFile = function(key, src, type) {
    self.queuedCount += 1;
    self.queue.push({
      'key':key,
      'src':src,
      'type':type
    });
  }

  this.loadFiles = function() {
    var queue = self.queue;
    if(queue.length == 0) {
      self.handleCompleted();
    } else {
      for(var i = 0; i < queue.length; i++) {
        switch(queue[i].type) {
          case 'image':
          default:
            self.loadImage(queue[i].key, queue[i].src);
        }
      }
    }
  }

  this.loadImage = function(key, src) {
    var img = new Image();
    img.onload = function(){
      self.handleLoaded(key, img, 'images');
    }
    img.src = self.basePath + src;
  }

  this.handleLoaded = function(key, val, type) {
    self.loadedCallback(key);
    if(undefined == self.data[type]) {
      self.data[type] = {};
    }
    self.data[type][key] = val;
    self.queuedCount -= 1;
    if (self.queuedCount == 0) {
      self.handleCompleted();
    }
  }

  this.loadedCallback = function(key) {
    console.log("File " + key + " loaded");
  }

  this.handleCompleted = function() {
    self.completedCallback();
  }

  this.completedCallback = function() {
    console.log('All files loaded');
  }
}