(function() {
    let cv = d3wb.config()
        .attr('margin', '50 10 60 70')
        .attr('debug', 'true')
        .data('data.csv')
        .toCanvas();

    d3.csv(cv.data).then(function(data) {
        d3wb.util.autocastNumericColumns(data);

        let plot = wbScatterPlot()
            .height(cv.hei)
            .width(cv.wid)
            .xDataPoints('Market value $m')
            .yDataPoints('Employees');
        cv.datum(data).call(plot);

        let xAxis = d3wb.add.xAxisBottom(plot.xAxisScale())
            .y(cv.hei).ticks(5);
        cv.call(xAxis);
        cv.call(d3wb.add.xAxisLabel('Market value $M').orientation('bottom'));

        let yAxis = d3wb.add.yAxis(plot.yAxisScale())
            .ticks(5).tickFormat(d3.format('.2s'));
        cv.call(yAxis);
        cv.call(d3wb.add.yAxisLabel('Employees'));

        // NEW CODE BELOW -------------------------

        let tooltip = d3wb.mouse.tooltip().selector(function(d) {
            return d['Company'] + '\n' +
                d['Market value $m'] + ' M$\n' +
                d['Employees'] + ' Employees\n';
        });
        cv.selectAll('.scatter-datapoint').call(tooltip);

        let click = d3wb.mouse.click().openTarget(function(d) {
            return 'https://duckduckgo.com/?q=' + encodeURIComponent(d['Company']);
        });
        cv.selectAll('.scatter-datapoint').call(click);
    });
})();
