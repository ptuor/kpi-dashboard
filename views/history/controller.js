export default class Controller {

    constructor(view, isTest=false) {
        this.erroeMessageForInvalidDates = "Please select a Date!"

        if (isTest === false){
            this.view = view

            view.registerRefreshHandler((fromDate, toDate)=>{
                return this.getValuesByFromAndToDate(fromDate,toDate)
            })
        }
    }



    validateDateAndTime(fromDate, toDate){
        if (fromDate === undefined){
            return false

        } else if (toDate === undefined){
            return false

        } else {

            return true
        }
    }

    getValuesByFromAndToDate(fromDate, toDate){
        const isValidDateTime = this.validateDateAndTime(fromDate,toDate)
        if (isValidDateTime){
            //TODO get values from server

            // return empty string if date and time is valid
            return {
                message: ""
            }
        }else{
            return {
                message: "Please select a Date!"
            }
        }

    }

    start() {

    }

}
