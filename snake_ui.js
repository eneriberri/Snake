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
    this.intervalID = window.setInterval(function() { that.step() }, 300);
  };
  
  View.prototype.handleKeyEvent = function(event) {
    var dir = View.KEYS[event.keyCode];
    if(dir) this.board.snake.turn(dir);  
  };
  
  View.prototype.step = function() {
    this.board.snake.move();
    this.$el.empty();
    this.render();
  };
  
  View.prototype.render = function() {
    var grid = this.board.render();
    for(var i = 0; i < grid.length; i++) {
      var row = "";
      for(var j = 0; j < grid[i].length; j++) {
        row += "<span class='cell'>" + grid[i][j] + "</span>";
      }
      this.$el.append("<div class='row'>" + row + "</div>");
    }
    
  };
  
  $(document).ready(function() {
    var SG = new SnakeGame.View($('#grid'));
    //start game upon any key stroke, triggers event only once
    $(window).one('keydown', function() { SG.start() });
  }); 
  
  
})(this);