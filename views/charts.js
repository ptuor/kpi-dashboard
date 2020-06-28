
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

        thresholdMessage(result.oee)

        oeeArray.push(result.oee)
        avaArray.push(result.ava)
        effArray.push(result.eff)
        quaArray.push(result.qua)

        if (count === 0) {
            createChart("OEE", result.oee)
            createChart("AVA", result.ava)
            createChart("EFF", result.eff)
            createChart("QUA", result.qua)
            createTrend(result.oee, result.ava, result.eff, result.qua)
        } else {
            updateChart( "OEE",0, result.oee)
            updateChart( "AVA",1, result.ava)
            updateChart( "EFF", 2, result.eff)
            updateChart( "QUA", 3,  result.qua)
            updateTrend(oeeArray, avaArray, effArray, quaArray)
        }
        count++
    })
}), 5000);

// create charts
function createChart(name, value) {
    const fillerValue = 100 - value

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
            text: `${name}\u00A0${value}%`,
            y: 40,
            style: {
                color: '#80ff80',
                font: 'bold 25px "Trebuchet MS", Verdana, sans-serif'
            }
        },
        plotOptions: {
            pie: {
                colors: [
                    '#80ff80',
                    '#808080'
                ],
                depth: 60,
                innerSize: '50%',
                dataLabels: {
                    enabled: false,
                }
            }
        },
        series: [{
            data: [{
                y: value
            },
                ["", (fillerValue)]
            ],
            enableMouseTracking: false,
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
        y: val,
    },
        ["", (100 - val)]
    ])

    Highcharts.charts[num].setTitle({ text: `${name}\u00A0${val}%`})
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

function thresholdMessage(oee) {
    if (oee < 30) {
        VanillaToasts.create({
            title: 'Warning',
            type: 'warning',
            text: 'The OEE value is very low',
            timeout: 2000
        });
    }
}