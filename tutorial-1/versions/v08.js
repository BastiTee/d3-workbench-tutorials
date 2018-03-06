(function() {
    d3wb.theme('dark');

    let cv = d3wb.config()
        .attr('margin', '50 10 60 70')
        .attr('bgColor', d3wb.color.background)
        .data('data.csv')
        .toCanvas();

    d3wb.util.injectCSS(`
        @import url('https://fonts.googleapis.com/css?family=Mina');` +
        cv.parentDivId + ` * {
            font-family: 'Mina', sans-serif;
        }`);

    d3.csv(cv.data, function(error, data) {
        d3wb.util.autocastNumericColumns(data);

        let plot = wbScatterPlot()
            .height(cv.hei)
            .width(cv.wid)
            .xDataPoints('Market value $m')
            .yDataPoints('Employees')
            .colorLow(d3wb.color.yellow)
            .colorHigh(d3wb.color.red);
        cv.datum(data).call(plot);

        let xAxis = d3wb.add.xAxisBottom(plot.xAxisScale())
            .y(cv.hei).ticks(5)
            .color(d3wb.color.foreground);
        cv.call(xAxis);
        cv.call(d3wb.add.xAxisLabel('Market value $M').orientation('bottom')
            .color(d3wb.color.foreground));

        let yAxis = d3wb.add.yAxis(plot.yAxisScale())
            .ticks(5).tickFormat(d3.format('.2s'))
            .color(d3wb.color.foreground);
        cv.call(yAxis);
        cv.call(d3wb.add.yAxisLabel('Employees')
            .color(d3wb.color.foreground));

        let tooltip = d3wb.mouse.tooltip().selector(function(d) {
            return d['Company'] + '\n' + d['Market value $m'] + ' M$\n' +
                d['Employees'] + ' Employees\n';
        }).color(d3wb.color.foreground);
        cv.selectAll('.scatter-datapoint').call(tooltip);

        let click = d3wb.mouse.click().openTarget(function(d) {
            return 'https://duckduckgo.com/?q=' +
                encodeURIComponent(d['Company']);
        });
        cv.selectAll('.scatter-datapoint').call(click);

        cv.call(d3wb.add.title('Financial Times Global 500 – 2015')
            .color(d3wb.color.foreground));

        let box = d3wb.html.infoBox(
                'This scatter plot compares the <b>' +
                'number of employees</b> with<br />the <b>market ' +
                'value</b> of the' +
                '<i>Financial Times Global 500</i><br />companies in 2015.' +
                '<br /><br /><b>Hover over dots</b> to show company details.' +
                '<br /><b>Click dots</b> to search for company online.' +
                '<br /><b>Use button</b> to change scale alignment.'
            )
            .infoColor(d3wb.color.foreground)
            .controlColor(d3wb.color.foreground)
            .controlColorHover(d3wb.color.yellow);
        cv.call(box);

        let callback = function(value) {
            if (value == 'Squared scale') {
                plot.xAxisScale(d3.scaleLinear());
                plot.yAxisScale(d3.scaleLinear());
            } else {
                plot.xAxisScale(d3.scalePow().exponent(0.1));
                plot.yAxisScale(d3.scalePow().exponent(0.2));
            }
            xAxis.scale(plot.xAxisScale());
            yAxis.scale(plot.yAxisScale());
            plot.update();
            xAxis.update();
            yAxis.update();
        };
        let button = d3wb.html.button()
            .options(['Linear scale', 'Squared scale'])
            .style('width', 180)
            .style('right', cv.mar.right)
            .style('bottom', 3)
            .style('color', d3wb.color.foreground)
            .style('background-color', d3wb.color.blue)
            .style('border', '1px solid ' + d3wb.color.foreground)
            .callback(callback);
        cv.call(button);
    });
})();
