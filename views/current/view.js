/****************************/
/* view                     */
/****************************/

export default class View {

    // constructor - create charts
    constructor(charts){
        this.charts = charts
        this.charts.createChart("OEE", 0)
        this.charts.createChart("AVA", 0)
        this.charts.createChart("EFF", 0)
        this.charts.createChart("QUA", 0)
        this.charts.createTrend(0, 0, 0, 0)
    }


    // pass al chart calls to functions of chart object
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


    // set threshold message for two seconds
    thresholdMessage(oee) {
            VanillaToasts.create({
                title: 'Warning',
                type: 'warning',
                text: 'The OEE value is very low',
                timeout: 2000
            });
    }

}
