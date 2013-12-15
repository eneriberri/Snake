(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {} );
  
  //Coordinate obj
  var Coord = SnakeGame.Coord = function(row, col) {
    this.row = row;
    this.col = col;
  };
  
  Coord.prototype.plus = function(coord) {
    return new Coord(this.row + coord.row, this.col + coord.col);
  };
  
   
  //Snake obj
  var Snake = SnakeGame.Snake = function(board) {
    this.board = board;
    this.dir = "S";
    var center = Math.floor(board.dim/2);
    this.segments = [new Coord(center, center), 
                     new Coord(center-1, center), 
                     new Coord(center-2, center)];
  };
  
  Snake.MOVES = {
    "N": new Coord(-1,0),
    "E": new Coord(0,1),
    "S": new Coord(1,0),
    "W": new Coord(0,-1)
  };
  
  //move by adding to the front of the snake, and cutting off last piece
  Snake.prototype.move = function() {
    var moveCoord = Snake.MOVES[this.dir];
    var head = _(this.segments).last();
    var newHead = head.plus(moveCoord);
    this.segments.push(newHead);
    this.segments.shift();
    
    console.log(newHead.row);
    console.log(newHead.col);
    console.log(this.outOfBounds(newHead));
    if(this.outOfBounds(newHead)) return true;
    else return false;
  };
  
  Snake.prototype.outOfBounds = function(newHead) {
    var border = this.board.dim;
    return newHead.row < 0 || newHead.col < 0 || 
           newHead.row >= border || newHead.col >= border;
  }; 
  
  Snake.prototype.turn = function(newDir) {
    this.dir = newDir;
  };
  
  Snake.SYMBOL = "S";
  
  //Board obj
  var Board = SnakeGame.Board = function(dim) {
    this.dim = dim;
    this.snake = new Snake(this);
    this.render();
  };
  
  Board.EMPTY_SPOT = "."
  
  Board.prototype.render = function() {
    var grid = new Array(this.dim);
    for(var i = 0; i < grid.length; i++) {
      grid[i] = new Array(this.dim);
      for(var j = 0; j < grid[i].length; j++) {
        grid[i][j] = Board.EMPTY_SPOT;
      }
    };
    
    //draw the snake
    _.each(this.snake.segments, function(coord) {
      grid[coord.row][coord.col] = Snake.SYMBOL;
    });
    
    return grid;
  };
  
})(this);