var Cell = function(value) {
    this.value = value || undefined;
    this.set = function (value) {
        this.value = value;
    }
}
var Row = function(cellVaules) {
    // this.init = function () {
        this.row = [];
        if(cellVaules){
            for (var i = 0; i < cellVaules.length; i++) {
                this.row.push(new Cell(cellVaules[i]));
            }
        }else{
            this.row = [new Cell, new Cell, new Cell, new Cell];
        }
        this.horizontalLength = this.row.length;
    // }

    function newNumber() {
        var min = 1;
        var max = 2;
        var probably = Math.random();
        if (probably > 0.2) {
            return 2
        } else {
            return 4
        }
    }
    this.deleteEmptyCell = function () {
        for (var i = this.row.length - 1; i >= 0; i--) {
            if (this.row[i].value === undefined) {
                this.row.splice(i, 1);
            }
        }
    }
    this.addEmptyCell = function (side) {
        var missingCellAmount = this.horizontalLength - this.row.length;
        if(missingCellAmount != 0){
            for (var i = 0; i < missingCellAmount; i++) {
                switch(side){
                    case 'left':
                        this.row.unshift(new Cell);
                        break;
                    case 'right':
                    default:
                        this.row.push(new Cell);
                }
            }
        }
    }
    this.leftSum = function() {
        this.deleteEmptyCell();
        for (var i = 0; i < this.row.length-1; i++) {
            var nextIndex = i + 1;
            // console.log("i="+i,this.row[i].value);
            if (nextIndex <= this.row.length) {
                if (this.row[i].value !== undefined && this.row[nextIndex].value == this.row[i].value) {
                    this.row[i].value += this.row[nextIndex].value;
                    this.row.splice(nextIndex, 1);
                }
            }
        }
    }
    this.rightSum = function() {
        this.deleteEmptyCell();
        this.row = this.row.reverse();
        this.leftSum();
        this.row = this.row.reverse();
    }
    this.left = function() {
        this.deleteEmptyCell();
        this.leftSum();
        this.addEmptyCell('right');
    }
    this.right = function() {
        this.deleteEmptyCell();
        this.rightSum();
        this.addEmptyCell('left');
    }
    this.set = function(array){
        for (var i = 0; i < this.row.length; i++) {
            this.row[i].value = array[i];
        }
        return this.getArray();
    }
    this.toString = function() {
        var output = this.getArray();
        return output.toString();
    }
    this.getArray = function () {
        var output = [];
        this.row.forEach(function(cell, i, row) {
            output.push(cell.value);
        })
        return output;
    }
}

// var test = [[1,2],[3,4],[5,6],[7,8]];

//console.log(test);
var Matrix2048 = function(colNum) {
    this.matrix = [new Row([undefined,4,2,undefined]), new Row([4,8,2,2]), new Row([undefined,8,undefined,undefined]), new Row([undefined,16,4,undefined])];

    this.getCol = function (colNum) {
        var col;
        var colValues = [];
        for (var i = 0; i < this.matrix.length; i++) {
            // console.log(this.matrix[i].row[colNum].value);
            colValues.push(this.matrix[i].row[colNum].value);
        }
        col = new Row(colValues);
        return col;
    }
    this.refreshCol = function (value,colNum){
        for (var i = 0; i < this.matrix.length; i++) {
            this.matrix[i].row[colNum].set(value[i]);
        }
    }
    this.upCol = function (colNum) {
        var col = new Row(this.getCol(colNum).getArray());
        col.left();
        this.refreshCol(col.getArray(), colNum);
        return this.getMatrix();
    }
    this.downCol = function (colNum) {
        var col = new Row(this.getCol(colNum).getArray());
        col.right();
        this.refreshCol(col.getArray(), colNum);
        return this.getMatrix();
    }
    this.up = function () {
        for (var i = 0; i < this.matrix.length; i++) {
            this.upCol(i);
        }
        return this.getMatrix();
    }
    this.down = function () {
        for (var i = 0; i < this.matrix.length; i++) {
            this.downCol(i);
        }
        return this.getMatrix();
    }
    this.right = function () {
        this.matrix.forEach(function (row, i, rows) {
            row.right();
        })
    }
    this.left = function () {
        this.matrix.forEach(function (row, i, rows) {
            row.left();
        })
    }
    this.move = function(moveTo) {
        switch (moveTo) {
            case 'right':
                this.right();
                console.log('move to ' + moveTo);
                break
            case 'left':
                this.left();
                console.log('move to ' + moveTo);
                break
            case 'up':
                this.up();
                console.log('move to ' + moveTo);
                break
            case 'down':
                this.down();
                console.log('move to ' + moveTo);
                break
            default:
                console.log('impossible move to ' + moveTo);
        }
    }
    this.getMatrix = function () {
        var output = [];
        this.matrix.forEach(function(row, i, rows) {
            output.push(row.getArray());
        });
        //console.log(output.toString());
        return output;
    }
    this.toString = function () {
        var output = this.getMatrix();
        return output.toString();
    }

    /*



    this.up = function () {

    }
*/
}

/*var row1 = new Row;
// console.log(row1.getValue());
var matrix = new Matrix2048;
matrix.getValue();
// row1.left();
//
// row1.right();
// console.log(row1.getValue());
matrix.move('up');
// matrix.move('left');
console.log(matrix.getValue());
*/
