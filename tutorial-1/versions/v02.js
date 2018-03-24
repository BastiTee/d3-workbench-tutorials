(function() {
    let cv = d3wb.config()
        .attr('margin', '50 10 60 70')
        .attr('debug', 'true')
        .data('data.csv')
        .toCanvas();

    d3.csv(cv.data).then(function(data) {
        // NEW CODE BELOW -------------------------

        d3wb.util.autocastNumericColumns(data);

        let plot = wbScatterPlot()
            .height(cv.hei)
            .width(cv.wid)
            .xDataPoints('Market value $m')
            .yDataPoints('Employees');
        cv.datum(data).call(plot);
    });
})();
