//import {Data as LocalData}  from './data.remote.js'
export default class Controller {

    constructor(view, data) {
        this.erroeMessageForInvalidDates = "Please select a Date!"
        this.erroeMessageNoValues = "No values found in this time range"

        this.view = view
        this.data = data
        view.registerRefreshHandler((fromDate, toDate)=>{
            return this.getValuesByFromAndToDate(fromDate,toDate)
        })

    }

    validateDateAndTime(fromDate, toDate){
        if (    (fromDate === undefined)
            ||  !(fromDate instanceof Date)){
            return false

        } else return !((toDate === undefined)
            || !(toDate instanceof Date));
    }

    async getValuesByFromAndToDate(fromDate, toDate){
        const isValidDateTime = this.validateDateAndTime(fromDate,toDate)
        if (isValidDateTime){

            const allOeeValues = await this.data.getValuesByDates(fromDate.toISOString(),toDate.toISOString())
            // check if any values have been returned
            if (allOeeValues.length === 0){
                return {
                    message: this.erroeMessageNoValues
                }
            }else{
                const averageOeeValues = {
                    oee: 0,
                    ava : 0,
                    eff:0,
                    qua:0
                }

                averageOeeValues.oee = this.calculateAverageOeeValues(allOeeValues.map(values => values.oee))
                averageOeeValues.ava = this.calculateAverageOeeValues(allOeeValues.map(values => values.ava))
                averageOeeValues.eff = this.calculateAverageOeeValues(allOeeValues.map(values => values.eff))
                averageOeeValues.qua = this.calculateAverageOeeValues(allOeeValues.map(values => values.qua))

                this.updateView(averageOeeValues, allOeeValues)

                // return empty string if date and time is valid
                return {
                    message: ""
                }
            }



        }else{
            return {
                message: this.erroeMessageForInvalidDates
            }
        }

    }


    updateView(averageOeeValues, oeeArray){
        this.view.updateChart("OEE", 0, averageOeeValues.oee)
        this.view.updateChart("AVA", 1, averageOeeValues.ava)
        this.view.updateChart("EFF", 2, averageOeeValues.eff)
        this.view.updateChart("QUA", 3, averageOeeValues.qua)
       this.view.updateTrend(
           (oeeArray.map(values => [Date.parse(values.createdAt), values.oee])),
           (oeeArray.map(values => [Date.parse(values.createdAt), values.ava])),
           (oeeArray.map(values => [Date.parse(values.createdAt), values.eff])),
           (oeeArray.map(values => [Date.parse(values.createdAt), values.qua])))
    }


    calculateAverageOeeValues(values = []){
        if (values.length > 0 ){
            const summ = values.reduce((summ, currentValue)=> summ + currentValue)
            return ( summ / values.length )
        } else{
            return 0
        }

    }


}
