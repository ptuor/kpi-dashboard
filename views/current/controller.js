export default class Controller {

    constructor(view, data) {
        this.view = view
        this.data = data
        this.oeeArray = []
    }


    run(){
        // Polling request to server
        const sleep = time => new Promise(resolve => setTimeout(resolve, time))
        const poll = (promiseFn, time) => promiseFn().then(
            sleep(time).then(() => poll(promiseFn, time)))

        poll(() => new Promise(() => {
            this.data.getActualValues((result)=>{
                this.oeeArray.push(result)
                this.thresholdMessage(result.oee)
                this.updateView(result, this.oeeArray)
            })

        }), 5000);
    }

    updateView(actualOeeValues, oeeArray){
        this.view.updateChart("OEE", 0, (Math.round(10 * actualOeeValues.oee) / 10))
        this.view.updateChart("AVA", 1, (Math.round(10 * actualOeeValues.ava) / 10))
        this.view.updateChart("EFF", 2, (Math.round(10 * actualOeeValues.eff) / 10))
        this.view.updateChart("QUA", 3, (Math.round(10 * actualOeeValues.qua) / 10))
        this.view.updateTrend(
            (oeeArray.map(values => [Date.parse(values.createdAt), values.oee])),
            (oeeArray.map(values => [Date.parse(values.createdAt), values.ava])),
            (oeeArray.map(values => [Date.parse(values.createdAt), values.eff])),
            (oeeArray.map(values => [Date.parse(values.createdAt), values.qua])))
    }

    thresholdMessage(oee) {
        if (oee < 30) {
            this.view.thresholdMessage(oee)
        }
    }

}