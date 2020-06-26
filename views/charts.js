let count = 0
let oeeArray = []
let avaArray = []
let effArray = []
let quaArray = []

// Polling request to server
const sleep = time => new Promise(resolve => setTimeout(resolve, time))
const poll = (promiseFn, time) => promiseFn().then(
    sleep(time).then(() => poll(promiseFn, time)))

poll(() => new Promise(() => {
    fetch("http://localhost:3000/oee/live", {
        headers: new Headers({'Accept': 'application/json'})
    }).then(response => {
        return response.json()
    }).then(result => {
        console.log(result)
        oeeArray.push(result.oee)
        avaArray.push(result.ava)
        effArray.push(result.eff)
        quaArray.push(result.qua)

        if (count === 0) {
            createChart("oee", result.oee)
            createChart("ava", result.ava)
            createChart("eff", result.eff)
            createChart("qua", result.qua)
            createTrend(result.oee, result.ava, result.eff, result.qua)
        } else {
            updateChart("oee", 0, result.oee)
            updateChart("ava", 1, result.ava)
            updateChart("eff", 2, result.eff)
            updateChart("qua", 3, result.qua)
            updateTrend(oeeArray, avaArray, effArray, quaArray)
        }
        count++
    })
}), 5000);

// create charts
function createChart(name, value) {
    Highcharts.chart(name, {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 30,
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
                colors: [
                    '#80ff80',
                    '#808080'
                ],
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 60,
                innerSize: '50%',
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

// create Trend
function createTrend(oeeC, avaC, effC, quaC) {
    Highcharts.chart('trend', {
        mapNavigation: {
            enableMouseWheelZoom: true
        },
        yAxis: {
            title: {
                text: 'Value in percent [%]'
            }
        },
        xAxis: {
            title: {
                text: 'Time in seconds [s]'
            },
            accessibility: {
                rangeDescription: 'Range: 5 to 10'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 0,
                pointInterval: 5
            }
        },
        series: [{
            type: 'column',
            name: 'OEE',
            data: [oeeC],
            color: "#80ff80"
        }, {
            name: 'AVA',
            data: [avaC],
            color: "#ffff33"
        }, {
            name: 'EFF',
            data: [effC],
            color: "#ff9933"
        }, {
            name: 'QUA',
            data: [quaC],
            color: "#ff0000"

        }],
/*        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }*/
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

//update trend
function updateTrend(oeeT, avaT, effT, quaT) {
    let values
    for (let i = 0; i <= 3; i++) {
        if (i === 0) {
            values = oeeT
        } else if (i === 1) {
            values = avaT
        } else if (i === 2) {
            values = effT
        } else if (i === 3) {
            values = quaT
        }
        Highcharts.charts[4].series[i].setData(
            values
        )
    }

}