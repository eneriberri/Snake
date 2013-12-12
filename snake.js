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
  var Snake = SnakeGame.Snake = function() {
    this.dir = "N";
    var center = new Coord(board.dim / 2, board.dim / 2);
    this.segments = [center];
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
    var head = Snake.segments[0];
    this.segments.push(head.plus(moveCoord));
    this.segments.shift();
  };
  
  Snake.prototype.turn = function(newDir) {
    this.dir = newDir;
  }
  
  
  //Board obj
  var Board = SnakeGame.Board = function(dim) {
    this.dim = dim;
    this.snake = new Snake();
    this.render();
  };
  
  Board.prototype.render = function() {
    var grid = new Array(this.dim);
    for(var i = 0; i < b.length; i++) {
      grid[i] = new Array(this.dim);
    };
    return grid;
  };
  
})(this);