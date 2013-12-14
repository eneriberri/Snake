(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {} );
  
  var View = SnakeGame.View = function(el) {
    this.$el = el;
    this.board = null;
  };
  
  View.DIMENSIONS = 500;
  
  View.prototype.start = function() {
    this.board = new Board(View.DIMENSIONS);
    this.$el.on('keydown');
  };
  
  View.prototype.handleKeyEvent(event) {
    var val = event.keyCode;
    if(val === 37) //left arrow
  };
  
  View.KEYCODES = {
    37: 
    37      37      37      37      37      Left arrow
     38      38      38      38      38      Up arrow
     39      39      39      39      39      Right arrow
     40      40      40      40      40      Down arrow
  }
  
  
  
})(this);