(function() {

    d3wb.theme('gotham')

    let cv = d3wb.config()
        .attr('margin', '50 50 55 70')
        .data('data.csv')
        .toCanvas();

    d3wb.util.injectCSS(`
        @import url('https://fonts.googleapis.com/css?family=Mina');` +
        cv.parentDivId + ` * {
            font-family: 'Mina', sans-serif;
        }`)

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

        cv.call(d3wb.add.xAxisBottom(plot.xAxisScale()).y(cv.hei)
            .color(d3wb.color.foreground));
        cv.call(d3wb.add.xAxisLabel('Market value $M').orientation('bottom')
            .color(d3wb.color.foreground));

        cv.call(d3wb.add.yAxis(plot.yAxisScale()).tickFormat(d3.format('.2s'))
            .color(d3wb.color.foreground));
        cv.call(d3wb.add.yAxisLabel('Employees')
            .color(d3wb.color.foreground));

        let tooltip = d3wb.mouse.tooltip().selector(function(d) {
            return d['Company'] + '\n' + d['Market value $m'] + ' M$\n';
        }).color(d3wb.color.foreground);
        cv.selectAll('.scatter-datapoint').call(tooltip);

        let click = d3wb.mouse.click().openTarget(function(d) {
            return 'https://duckduckgo.com/?q=' +
                encodeURIComponent(d['Company']);
        });
        cv.selectAll('.scatter-datapoint').call(click);

        cv.call(d3wb.add.title('Financial Times Global 500 – 2015')
            .color(d3wb.color.foreground))

        let box = d3wb.html.infoBox(
                'This scatter plot compares the <b>' +
                'number of employees</b> with<br />the <b>market value</b> of the' +
                '<i>Financial Times Global 500</i><br />companies from 2015.' +
                '<br /><br /><b>Hover over dots</b> to see company details.' +
                '<br /><b>Click dots</b> to search for company online.')
            .infoColor(d3wb.color.foreground)
            .controlColor(d3wb.color.foreground)
            .controlColorHover(d3wb.color.yellow)
        cv.call(box);
    });
})();
