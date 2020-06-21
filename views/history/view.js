export class View {
    constructor(datePickerRootSelector){

        let datePickerFrom = flatpickr(datePickerRootSelector + " .fromDate", {
            enableTime: true,
            time_24hr: true,
            "maxDate": new Date().fp_incr(0),
            dateFormat: "d.m.Y H:i",
            onClose: (selectedDates, dateStr, instance) => {
                datePickerTo.set('minDate', dateStr)
                this.dateFrom = dateStr
            }
        });

        let datePickerTo = flatpickr(datePickerRootSelector + " .toDate", {
            enableTime: true,
            "maxDate": new Date().fp_incr(0),
            time_24hr: true,
            dateFormat: "d.m.Y H:i",
            onClose: (selectedDates, dateStr, instance) => {
                datePickerFrom.set('maxDate', dateStr)
                this.dateTo = dateStr
            }
        });

        const refreshDates = document.querySelector(datePickerRootSelector + " .refreshDate")
        this.addRfreshEventlistener(refreshDates)

    }



    addRfreshEventlistener(button){
        button.addEventListener('click', (evt)=>{
            const result =this.onRefreshHandler(this.dateFrom, this.dateTo)
            if (result.message !== ""){
                alert(result.message)
            }
        })
    }


    registerRefreshHandler(onRefreshHandler){
        this.onRefreshHandler = onRefreshHandler
    }




    // create charts
    createChart(name, value) {
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


    //update charts
    updateChart(name, num, val) {
        Highcharts.charts[num].series[0].setData([{
            name: name,
            y: val,
            selected: true
        },
            ["??", (100 - val)]
        ])
    }



    // create Trend
    createTrend(oeeC, avaC, effC, quaC) {
        Highcharts.chart('trend', {

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
            responsive: {
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
            }
        });
    }



    //update trend
    updateTrend(oeeT, avaT, effT, quaT) {
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

    render(items){
        items.forEach(item => this.addItemToList(item))
    }

    addEventListeners(newField) {
        newField.addEventListener('keypress', (ev) => {
            if (ev.key === 'Enter') {
                const text = ev.target.value
                const newItem = {description: text}

                const result = this.onAddItemHandler(newItem)
                if(result.message !== ""){
                    alert(result.message)
                }
            }
        })
    }



}
