//create charts
fetch("http://localhost:3000/polling").then(response => {
    return response.json();
}).then(result => {
    createChart("oee", result.oee)
    createChart("ava", result.ava)
    createChart("eff", result.eff)
    createChart("qua", result.qua)
})

// Polling request to server
const sleep = time => new Promise(resolve => setTimeout(resolve, time))
const poll = (promiseFn, time) => promiseFn().then(
    sleep(time).then(() => poll(promiseFn, time)))

poll(() => new Promise(() => {

    fetch("http://localhost:3000/oee/1", {
        headers: new Headers({
            'Accept': 'application/json'
        })
    }).then(response => {
        return response.json();
    }).then(result => {
        updateChart("oee", 0, result.oee)
        updateChart("ava", 1, result.ava)
        updateChart("eff", 2, result.eff)
        updateChart("qua", 3, result.qua)
    })
}), 5000);

// create charts
function createChart(name, value) {
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
            data: [{
                    name: name,
                    y: value,
                    selected: true
                },
                ["??", (100 - value)]
            ]
        }],
    });
}

//update charts
function updateChart(name, num, val) {
    Highcharts.charts[num].series[0].setData([{
            name: name,
            y: val,
            selected: true
        },
        ["??", (100 - val)]
    ])
}