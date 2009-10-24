var Game = function (board) {
    this.board = board;
};

Game.compare = function (gameA, gameB) {
    return gameA.board.every(function (row, i) {
        return row.every(function (cell, j) {
            return gameA.elementAt(i, j) === gameB.elementAt(i, j);
        });
    });
};

Game.prototype.elementAt = function (x, y) {
    return this.board[x] ? this.board[x][y] : undefined;
};

Game.prototype.eachRow = function (callback) {
    this.board.map(function (row, i, rows) {
        row.eachCell = row.map;
        callback(row, i, rows);
    });
};

Game.prototype.nextGeneration = function () {
    var self      = this;
    var rowMatrix = [];

    this.eachRow(function (cells, i) {
        var cellMatrix = [];

        cells.eachCell(function (cell, j) {
            var newCell = self.cellSurvives(i, j) ? 1 : 0;
            cellMatrix.push(newCell);
        });
        
        rowMatrix.push(cellMatrix);
    });

    return new Game(rowMatrix);
};

Game.prototype.neighboursNumber = function (x, y) {
    return [
        this.elementAt(x - 1, y - 1),
        this.elementAt(x,     y - 1),
        this.elementAt(x + 1, y - 1),

        this.elementAt(x - 1, y),
        this.elementAt(x,     y),
        this.elementAt(x + 1, y),

        this.elementAt(x - 1, y + 1),
        this.elementAt(x,     y + 1),
        this.elementAt(x + 1, y + 1),

    ].map(function (a) a || 0)
     .reduce(function (a, b) a + b);
};

Game.prototype.cellSurvives = function (x, y) {
    var neighboursNumber = this.neighboursNumber(x, y);
};

var render = function (game) {
    var rows = [];

    game.eachRow(function (cells, i) {
        rows.push(cells.reduce(function (accumulator, cell) {
            return accumulator + ((cell === 1) ? "X" : "-");
        }, ""));
    });

    return rows.join("\n");
};
