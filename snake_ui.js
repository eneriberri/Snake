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
  
  View.prototype.handleKeyEvent = function(event) {
    var val = event.keyCode;
    if(val === 37) //left arrow
      this.board.snake.turn("W");
    else if(val === 38) //up arrow
      this.board.snake.turn("N");
    else if(val === 39) //right arrow
      this.board.snake.turn("E");
    else if(val === 40) //down arrow
      this.board.snake.turn("S");
    
    setInterval(function() { this.step() }, 500);
  };
  
  View.prototype.step = function() {
    this.board.snake.move();
    var display = this.board.render();
    this.$el.html(display);
  };
  
  
  
})(this);