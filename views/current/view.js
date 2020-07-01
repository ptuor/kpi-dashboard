export default class View {
    constructor(charts){
        this.charts = charts
        this.charts.createChart("OEE", 0)
        this.charts.createChart("AVA", 0)
        this.charts.createChart("EFF", 0)
        this.charts.createChart("QUA", 0)
        this.charts.createTrend(0, 0, 0, 0)
    }


    createChart(name, value) {
        this.charts.createChart(name,value)
    }

    updateChart(name, num, val) {
        this.charts.updateChart(name, num, val)
    }

    createTrend(oeeC, avaC, effC, quaC) {
        this.charts.createTrend(oeeC, avaC, effC, quaC)
    }

    updateTrend(oeeT, avaT, effT, quaT) {
        this.charts.updateTrend(oeeT, avaT, effT, quaT)
    }



    thresholdMessage(oee) {
            VanillaToasts.create({
                title: 'Warning',
                type: 'warning',
                text: 'The OEE value is very low',
                timeout: 2000
            });
    }

}
