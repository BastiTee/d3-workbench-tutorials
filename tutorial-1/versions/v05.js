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

        let xAxis = d3wb.add.xAxisBottom(plot.xAxisScale())
            .y(cv.hei).ticks(5);
        cv.call(xAxis);
        cv.call(d3wb.add.xAxisLabel('Market value $M').orientation('bottom'));

        let yAxis = d3wb.add.yAxis(plot.yAxisScale())
            .ticks(5).tickFormat(d3.format('.2s'));
        cv.call(yAxis);
        cv.call(d3wb.add.yAxisLabel('Employees'));

        let tooltip = d3wb.mouse.tooltip().selector(function(d) {
            return d['Company'] + '\n' + d['Market value $m'] + ' M$\n' +
                d['Employees'] + ' Employees\n';
        });
        cv.selectAll('.scatter-datapoint').call(tooltip);

        let click = d3wb.mouse.click().openTarget(function(d) {
            return 'https://duckduckgo.com/?q=' +
                encodeURIComponent(d['Company']);
        });
        cv.selectAll('.scatter-datapoint').call(click);

        // NEW CODE BELOW -------------------------

        cv.call(d3wb.add.title('Financial Times Global 500 – 2015'));

        let box = d3wb.html.infoBox(
            'This scatter plot compares the <b>' +
            'number of employees</b> with<br />the <b>market ' +
            'value</b> of the' +
            '<i>Financial Times Global 500</i><br />companies in 2015.' +
            '<br /><br /><b>Hover over dots</b> to show company details.' +
            '<br /><b>Click dots</b> to search for company online.'
        );
        cv.div.call(box);
    });
})();
