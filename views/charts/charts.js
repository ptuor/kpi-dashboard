/****************************/
/* Charts - highcharts      */
/****************************/

// class which exports all relevant methods to create and update charts
export default class Charts {
    createChart(name, value){
        createChart(name, value)
    }

    updateChart(name, num, val){
        updateChart(name, num, val)
    }

    createTrend(oeeC, avaC, effC, quaC){
        createTrend(oeeC, avaC, effC, quaC)
    }

    updateTrend(oeeT, avaT, effT, quaT){
        updateTrend(oeeT, avaT, effT, quaT)
    }
}


// create charts
const createChart = (name, value) => {
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
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 60,
                innerSize: '50%',
                dataLabels: {
                    enabled: false,
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'KPI',
            data: [{
                y: value,
            },
                ["", (100 - value)]
            ],
            enableMouseTracking: false,
        }],
    });
}


//update charts
const updateChart = (name, num, val) => {
    Highcharts.charts[num].series[0].setData([{
        y: val,
    },
        ["", (100 - val)]
    ])
    Highcharts.charts[num].setTitle({ text: `${name}\u00A0${val}%`})
}


// create Trend
const createTrend = (oeeC, avaC, effC, quaC) => {
    Highcharts.chart('trend', {
        mapNavigation: {
            enableMouseWheelZoom: true
        },
        yAxis: {
            max: 100,
            title: {
                text: 'Value in percent',
                style: {
                    font: 'bold 14px "Trebuchet MS", Verdana, sans-serif'
                }
            }
        },
        xAxis: {
            type: 'datetime',
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
                text: 'Date and Time',
                style: {
                    font: 'bold 14px "Trebuchet MS", Verdana, sans-serif'
                }
            },
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
                pointInterval: 5
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


//update trend
const updateTrend = (oeeT, avaT, effT, quaT) => {
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
