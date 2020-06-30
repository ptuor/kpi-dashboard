export default class Controller {

    constructor(view, data) {
        this.view = view
        this.data = data


        this.view.createChart("OEE", 0)
        this.view.createChart("AVA", 0)
        this.view.createChart("EFF", 0)
        this.view.createChart("QUA", 0)
        this.view.createTrend(0, 0, 0, 0)
    }






    updateView(actualOeeValues, oeeArray){
        this.view.updateChart("OEE", 0, actualOeeValues.oee)
        this.view.updateChart("AVA", 1, actualOeeValues.ava)
        this.view.updateChart("EFF", 2, actualOeeValues.eff)
        this.view.updateChart("QUA", 3, actualOeeValues.qua)
        this.view.updateTrend(
            (oeeArray.map(values => [Date.parse(values.createdAt), values.oee])),
            (oeeArray.map(values => [Date.parse(values.createdAt), values.ava])),
            (oeeArray.map(values => [Date.parse(values.createdAt), values.eff])),
            (oeeArray.map(values => [Date.parse(values.createdAt), values.qua])))
    }


}