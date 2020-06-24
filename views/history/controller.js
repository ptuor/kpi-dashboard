//import {Data as LocalData}  from './data.remote.js'
export default class Controller {

    constructor(view, data, isTest=false) {
        this.erroeMessageForInvalidDates = "Please select a Date!"

        if (isTest === false){
            this.view = view
            this.data = data
            view.registerRefreshHandler((fromDate, toDate)=>{
                return this.getValuesByFromAndToDate(fromDate,toDate)
            })

        } else {
           // this.data = new LocalData
        }

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


            const oeeValues = await this.data.getValuesByDates(fromDate,toDate)
            this.updateView(oeeValues)

            // return empty string if date and time is valid
            return {
                message: ""
            }

        }else{
            return {
                message: this.erroeMessageForInvalidDates
            }
        }

    }


    updateView(averageOeeValues, kpiArray){
        this.view.updateChart("oee", 0, averageOeeValues.oee)
        this.view.updateChart("ava", 1, averageOeeValues.ava)
        this.view.updateChart("eff", 2, averageOeeValues.eff)
        this.view.updateChart("qua", 3, averageOeeValues.qua)
        //this.view.updateTrend((kpiArray.map(values => values.oee), (kpiArray.map(values => values.ava), (kpiArray.map(values => values.eff), (kpiArray.map(values => values.oee)qua)
    }





}
