/****************************/
/* controller               */
/****************************/

export default class Controller {

    // constructor which implements view and model
    constructor(view, data) {

        // set error messages
        this.erroeMessageForInvalidDates = "Please select a Date!"
        this.erroeMessageNoValues = "No values found in this time range"

        // implement view and model
        this.view = view
        this.data = data

        // register event handler for refresh button
        view.registerRefreshHandler((fromDate, toDate)=>{
            return this.getValuesByFromAndToDate(fromDate,toDate)
        })
    }


    // check if date and time is valid
    validateDateAndTime(fromDate, toDate){
        if (    (fromDate === undefined)
            ||  !(fromDate instanceof Date)){
            return false

        } else return !((toDate === undefined)
            || !(toDate instanceof Date));
    }


    // get values by date query
    async getValuesByFromAndToDate(fromDate, toDate){
        const isValidDateTime = this.validateDateAndTime(fromDate,toDate)
        if (isValidDateTime){

            fromDate.setHours(fromDate.getHours() + 2)
            toDate.setHours(toDate.getHours() + 2)

            const allOeeValues = await this.data.getValuesByDates(fromDate.toISOString(),toDate.toISOString())
            // check if any values have been returned
            if (allOeeValues.length === 0){
                // return error message if no OEE values have been found
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

                // calculate average values
                averageOeeValues.oee = this.calculateAverageOeeValues(allOeeValues.map(values => values.oee))
                averageOeeValues.ava = this.calculateAverageOeeValues(allOeeValues.map(values => values.ava))
                averageOeeValues.eff = this.calculateAverageOeeValues(allOeeValues.map(values => values.eff))
                averageOeeValues.qua = this.calculateAverageOeeValues(allOeeValues.map(values => values.qua))

                // update view with received values
                this.updateView(averageOeeValues, allOeeValues)

                // return empty string if date and time is valid
                return {
                    message: ""
                }
            }

        }else{
            // return error message if any date is invalid
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
            return (Math.round(10 * (summ / values.length))/10)
        } else{
            return 0
        }
    }
}
