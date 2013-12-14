(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {} );
  
  var View = SnakeGame.View = function(el) {
    this.$el = el;
    this.board = null;
  };
  
  View.DIMENSIONS = 20;
  
  View.KEYS = {
    37: "W",
    38: "N",
    39: "E",
    40: "S"
  };
  
  View.prototype.start = function() {
    this.board = new SnakeGame.Board(View.DIMENSIONS);
    var that = this;
    $(window).keydown(function(event) { that.handleKeyEvent(event); });
    this.intervalID = window.setInterval(function() { that.step() }, 1000);
  };
  
  View.prototype.handleKeyEvent = function(event) {
    var dir = View.KEYS[event.keyCode];
    if(dir) this.board.snake.turn(dir);  
  };
  
  View.prototype.step = function() {
    this.board.snake.move();
    var display = this.board.render();
    this.$el.html(display);
  };
  
  $(document).ready(function() {
    var SG = new SnakeGame.View($('#grid'));
    SG.start();
  });
  
  
  
})(this);