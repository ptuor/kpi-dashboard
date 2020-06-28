
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
            createChart("OEE", result.oee, 40)
            createChart("AVA", result.ava, 80)
            createChart("EFF", result.eff, 80)
            createChart("QUA", result.qua, 80)
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
function createChart(name, value, labelPosition) {
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
            y: labelPosition,
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
            max: 100,
            title: {
                text: 'Value in percent [%]',
                style: {
                    font: 'bold 14px "Trebuchet MS", Verdana, sans-serif'
                }
            }
        },
        xAxis: {
            type: 'datetime',
            // dateTimeLabelFormats: { // don't display the dummy year
            //     month: '%e. %b',
            //     year: '%b'
            // },
            dateTimeLabelFormats:{
                second: '%H:%M',
                minute: '%H:%M',
                hour: '%e. %b / %H:%M',
                day: '%e. %b',
                week: '%e. %b',
                month: '%b \'%y',
                year: '%Y'
            },
            title: {
                text: 'Date',
                style: {
                    font: 'bold 14px "Trebuchet MS", Verdana, sans-serif'
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            itemStyle: {
                color: '#808080',
                fontWeight: 'bold',
                fontSize: '14px'
            },
            symbolRadius: 0
        },
        plotOptions: {
            series: {
                pointStart: 0,
                pointInterval: 5,
            }
        },
        series: [{
            type: 'column',
            name: 'OEE',
            data: [oeeC],
            color: "#80ff80",
            marker: {
                symbol: 'none'
            }
        }, {
            name: 'AVA',
            data: [avaC],
            color: "#ffff33",
            marker: {
                symbol: 'circle'
            }
        }, {
            name: 'EFF',
            data: [effC],
            color: "#ff9933",
            marker: {
                symbol: 'circle'
            }
        }, {
            name: 'QUA',
            data: [quaC],
            color: "#ff0000",
            marker: {
                symbol: 'circle'
            }
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 480
                },
                chartOptions: {
                    legend: {
                        enabled: false
                    }
                }
            }]
        }
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

window.onresize = function() {
    location.reload()
}
