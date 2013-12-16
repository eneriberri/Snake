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
    
    if(this.outOfBounds(newHead)) return false; //out of bounds, game over
    
    this.segments.push(newHead);
    this.segments.shift();
    
    //moved to heart (todo: add check for moving onto itself)
    var pos = this.board.grid[newHead.row][newHead.col];
    this.checkMove(pos, moveCoord);  
    
    return true;
  };
  
  Snake.prototype.checkMove = function(pos, moveCoord) {
    if(pos === Heart.SYMBOL) {
      var last = _(this.segments).last();
      this.segments.push(last.plus(moveCoord));
      this.board.heart.pos = null; //clear the heart eaten
    }
  }
  
  Snake.prototype.outOfBounds = function(newHead) {
    var border = this.board.dim;
    return newHead.row < 0 || newHead.col < 0 || 
           newHead.row >= border || newHead.col >= border;
  }; 
  
  Snake.OPPOSITE_DIRS = {
    "N": "S",
    "S": "N",
    "E": "W",
    "W": "E"
  };
  
  Snake.prototype.turn = function(newDir) {
    //can't move onto itself
    if(newDir === Snake.OPPOSITE_DIRS[this.dir]) return;
    
    this.dir = newDir;
  };
  
  Snake.SYMBOL = "S";
  
  //Board obj
  var Board = SnakeGame.Board = function(dim) {
    this.dim = dim;
    this.snake = new Snake(this);
    this.heart = new Heart(this);
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
    
    //generate heart if it doesn't exist yet
    this.displayHeart(grid);
    
    this.grid = grid; 
    return grid;
  };
  
  
  Board.prototype.displayHeart = function(grid) {
    if(typeof this.heart.pos === 'undefined' || !this.heart.pos) {
      while(true) {
        this.heart.generate();
        var coord = this.heart.pos;
        if(grid[coord.row][coord.col] !== Snake.SYMBOL) {
          grid[coord.row][coord.col] = Heart.SYMBOL;
          break;
        }
      }
    }
    else {
      grid[this.heart.pos.row][this.heart.pos.col] = Heart.SYMBOL;
    }
  }
  
  
  //Heart object
  var Heart = SnakeGame.Heart = function(board) {
    this.board = board;
    this.pos;
  };
  
  Heart.SYMBOL = "&#10084";
  
  Heart.prototype.generate = function() {
    
    var x = Math.floor(Math.random() * this.board.dim);
    var y = Math.floor(Math.random() * this.board.dim);
    
    this.pos = new Coord(x, y);
  };
  
})(this);