

createChart("oee", 60)
createChart("ava", 80)
createChart("eff", 90)
createChart("qua", 75)

function createChart (name, value) {
    Highcharts.chart(name, {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'Browser market shares at a specific website, 2014'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 60,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'KPI',
            data: [
                {
                    name: name,
                    y: value,
                    //sliced: true,
                    selected: true
                },
                ["??", (100 - value)]
            ]
        }]
    });
}