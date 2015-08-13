var Cell = function(value) {
    this.value = value || undefined;

}
var Row = function() {
    this.row = [new Cell(4), new Cell(4), new Cell(8), new Cell(16)];
    this.horizontalLength = this.row.length;

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
                        this.row.push(new Cell);
                        break;
                    case 'right':
                    default:
                        this.row.unshift(new Cell);
                }
            }
        }
    }
    this.leftSum = function() {
        this.deleteEmptyCell();
        for (var i = 0; i < this.row.length-1; i++) {
            var nextIndex = i + 1;
            console.log("i="+i,this.row[i].value);
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
        this.addEmptyCell();
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
/*var Matrix2048 = function(colNum) {
    this.value = [new Row, new Row, new Row, new Row];

    this.getCol = function (colNum) {
        var col = [];
        for (var i = 0; i < this.value.length; i++) {
            col.push(this.value[i].value[colNum].value);
        }
        return col;
    }
    this.getValue = function() {
        var output = [];
        this.value.forEach(function(row, i, rows) {
            output.push(row.getValue());
        });
        //console.log(output.toString());
        return output;
    }
    this.right = function () {
        this.value.forEach(function (row, i, rows) {
            row.right();
        })
    }
    this.left = function () {
        this.value.forEach(function (row, i, rows) {
            row.left();
        })
    }
    this.upOne = function (colNum) {
        var col = new Row(this.getCol(colNum));


    }
    this.up = function () {

    }
    this.move = function(moveTo) {
        switch (moveTo) {
            case 'right':
                this.right();
                console.log('move to ' + moveTo);
                console.log('Now matrix is ' + this.getValue());
                break
            case 'left':
                this.left();
                console.log('move to ' + moveTo);
                console.log('Now matrix is ' + this.getValue());
                break
            case 'up':
                // this.upCol(1);
                console.log('move to ' + moveTo);
                break
            case 'down':
                console.log('move to ' + moveTo);
                break
            default:
                console.log('impossible move to ' + moveTo);
        }
    }
}

var row1 = new Row;
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
