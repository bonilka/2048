var Cell = function(value) {
    this.value = value || undefined;

}
var Row = function() {
    this.value = [new Cell(2), new Cell(4), new Cell(8), new Cell(16)];
    this.horizontalLength = this.value.length;

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
        for (var i = this.value.length - 1; i >= 0; i--) {
            if (this.value[i].value === undefined) {
                this.value.splice(i, 1);
            }
        }
    }
    this.rightSum = function() {
        this.deleteEmptyCell();
        console.log(this.getValue());
        for (var i = this.value.length - 1; i > 0; i--) {
            var prevIndex = i - 1;
            if (this.value[prevIndex].value === undefined || this.value[prevIndex].value !== this.value[i].value) {
                continue;
            } else {
                this.value[i].value += this.value[prevIndex].value;
                this.value.splice(prevIndex,1); //удаляем эелмент с которым складывали
                i--;
            }
        }
    }
    this.pressRight = function() {
        // for (var i = this.value.length - 1; i >= 0; i--) {
        //     if (this.value[i].value === undefined) {
        //         this.value.splice(i, 1);
        //         //i--; //с итерациями ничего не делаем, так как счет идет с конца
        //     }
        // }
        for (var i = 0, delta = this.horizontalLength - this.value.length; i < delta; i++) {
            this.value.unshift(new Cell);
        }
    }
    this.leftSum = function() {
        this.deleteEmptyCell();
        for (var i = 0; i < this.value.length-1; i++) {
            var nextIndex = i + 1;
            if (this.value[nextIndex].value === undefined || this.value[nextIndex].value !== this.value[i].value) {
                continue;
            } else {
                this.value[i].value += this.value[nextIndex].value;
                this.value[nextIndex].value = undefined;
                i++; //обработали же два индекса, поэтому перемещаемся на один дополнительный
            }
        }
    }
    this.pressLeft = function() {
        // for (var i = 0; i < this.value.length; i++) {
        //     if (this.value[i].value === undefined) {
        //         this.value.splice(i, 1);
        //         i--; //т.к. длина массива стала меньше то и цикл надо вернуть на одну итерацию
        //     }
        // }
        for (var i = 0, delta = this.horizontalLength - this.value.length; i < delta; i++) {
            this.value.push(new Cell);
        }
    }
    this.right = function() {
        this.rightSum();
        this.pressRight();
    }
    this.left = function() {
        this.leftSum();
        this.pressLeft();
    }
    this.getValue = function() {
        var output = [];
        this.value.forEach(function(cell, i, row) {
            output.push(cell.value);
        })
        // console.log(output);
        return output;
    }
}
var Matrix = {
    shiftUp: function (matr, row, col) {
        matr[row-1][col] = matr[row][col];
        matr[row][col] = undefined;
        return matr;
    }
}
var test = [[1,2],[3,4],[5,6],[7,8]];
Matrix.shiftUp(test,2,1);
for(var i = test[0].length-1; i>=0;i--){
    Matrix.shiftUp(test,i,1);
}
console.log(test);
//console.log(test);
var Matrix2048 = function() {
    this.value = [new Row, new Row, new Row, new Row];
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
    this.upCol = function (colNum) {
        for (var i = 0; i < this.value.length; i++) {
            var nextIndex = i+1;
            console.log(this.value[nextIndex].value[colNum].value);
            while(this.value[nextIndex].value[colNum].value == undefined){
                nextIndex++;
            }
            this.value[i].value[colNum].value += this.value[nextIndex].value[colNum].value;
            this.value[nextIndex].value[colNum].value = undefined;
            i = nextIndex-1;
            console.log(this.value[i].value[colNum].value);
        }
    }
    this.up = function () {
        // for (var i = 0; i < this.value[0].value.length; i++) { //this.value[0].length-колличество столбцов
        //     console.log(i);
        //     for (var j = 0; j < this.value.length; j++) {
        //         if(this.value[i].value[j])
        //     }
        //     // this.value.forEach(function (row, j, rows) {
        //     //     console.log(row.value[i]);
        //     // })
        // }
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
                this.upCol(1);
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
