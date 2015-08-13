var matrix = new Matrix2048;
var refreshTable = function() {
    var arr = matrix.toString().split(',');
    $('.table2048 td').each(function(index, el) {
            if (!arr[index]) {
                $(el).removeClass().text("");

            } else {
                $(el).removeClass().addClass('color-'+arr[index]).text(arr[index]);
            }

    });
}
$(document).on('keydown', function(event) {
    // event.preventDefault();
    if (event.which == 37) {
        matrix.move('left');
        refreshTable();
    }
    if (event.which == 38) {
        matrix.move('up');
        refreshTable();
    }
    if (event.which == 39) {
        matrix.move('right');
        refreshTable();
    }
    if (event.which == 40) {
        matrix.move('down');
        refreshTable();
    }

});
refreshTable();
