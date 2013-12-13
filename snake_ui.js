(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {} );
  
  var View = SnakeGame.View = function(el) {
    this.$el = el;
  };
  
  View.DIMENSIONS = 500;
  
  View.prototype.start = function() {
    var grid = new Board(View.DIMENSIONS);
    this.$el.on('keydown');
  };
  
  View.prototype.handleKeyEvent(event) {
    
  };
  
  
  
})(this);