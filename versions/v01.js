(function() {
    let cv = d3wb.config()
        .attr('margin', '50 50 55 70')
        .attr('debug', 'true')
        .data('data.csv')
        .toCanvas();

    d3.csv(cv.data, function(error, data) {

        // Todo..

    });
})();
