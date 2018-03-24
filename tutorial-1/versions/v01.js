(function() {
    let cv = d3wb.config()
        .attr('margin', '50 10 60 70')
        .attr('debug', 'true')
        .data('data.csv')
        .toCanvas();

    d3.csv(cv.data).then(function(data) {

        // Todo..

    });
})();
