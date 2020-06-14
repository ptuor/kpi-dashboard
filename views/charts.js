
const sleep = time => new Promise(resolve => setTimeout(resolve, time))
const poll = (promiseFn, time) => promiseFn().then(
    sleep(time).then(() => poll(promiseFn, time)))

// Greet the World every second
poll(() => new Promise(() => {

    // get new data from mongoDB and update pie chart
    fetch("http://localhost:3000/polling").then(response => {
        return response.json();
    }).then( result => {
        console.log(result)
    });

createChart("oee", 50)
createChart("ava", 50)
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
}), 5000)