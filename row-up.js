var arr = [
    [2, undefined, 4, undefined],
    [2, 8, 4, undefined],
    [undefined, undefined, 4, undefined],
    [2, undefined, 4, undefined]
];
var press = function(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === undefined) {
            arr.splice(i, 1);
            i--;
        }
    }
}

var sumFromLeft = function(arr) {
    for (var i = 0; i < arr.length; i++) {
        var nextIndex = i + 1;
        if (nextIndex <= arr.length) {
            if (arr[i] !== undefined && arr[nextIndex] == arr[i]) {
                arr[i] += arr[nextIndex];
                arr.splice(nextIndex, 1);
                i--;
            }
        }
    }
    return arr;
}
var sumFromRight = function(arr) {
    arr = sumFromLeft(arr.reverse());
    return arr.reverse();
}
var addCellToRight = function(arr, amount) {
    for (var i = 0; i < amount; i++) {
        arr.push(undefined);
    }
}
var addCellToLeft = function(arr, amount) {
    for (var i = 0; i < amount; i++) {
        arr.unshift(undefined);
    }
}
var getCol = function(arr, colNum) {
    var col = [];
    for (var i = 0; i < arr.length; i++) {
        col.push(arr[i][colNum]);
    }
    return col;
}
var up = function(arr, colNum) {
    var col = getCol(arr, colNum);
    var missingCellAmount = 0;
    press(col);
    sumFromLeft(col);
    // press(col);
    missingCellAmount = 4 - col.length;
    addCellToRight(col, missingCellAmount)
    for (var i = 0; i < arr.length; i++) {
        arr[i][colNum] = col[i];
    }
    return arr;
}
var down = function(arr, colNum) {
    var col = getCol(arr, colNum);
    var missingCellAmount = 0;
    press(col);
    sumFromRight(col);
    missingCellAmount = 4 - col.length;
    addCellToLeft(col, missingCellAmount)
    for (var i = 0; i < arr.length; i++) {
        arr[i][colNum] = col[i];
    }
    return arr;
}
console.log(up(arr, 0));
console.log(down(arr, 1));
