(function() {
    let cv = d3wb.config()
        .attr('margin', '50 10 60 70')
        .attr('debug', 'true')
        .data('data.csv')
        .toCanvas();

    d3.csv(cv.data, function(error, data) {
        d3wb.util.autocastNumericColumns(data);

        let plot = wbScatterPlot()
            .height(cv.hei)
            .width(cv.wid)
            .xDataPoints('Market value $m')
            .yDataPoints('Employees');
        cv.datum(data).call(plot);

        // NEW CODE BELOW -------------------------

        cv.call(
            d3wb.add.xAxisBottom(plot.xAxisScale())
            .y(cv.hei).ticks(5));
        cv.call(
            d3wb.add.xAxisLabel('Market value $M').orientation('bottom'));

        cv.call(
            d3wb.add.yAxis(plot.yAxisScale())
            .ticks(5).tickFormat(d3.format('.2s')));
        cv.call(
            d3wb.add.yAxisLabel('Employees'));
    });
})();
