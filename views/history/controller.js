export class Controller {

    constructor(view) {
        this.view = view

        view.registerRefreshHandler((fromDate, toDate)=>{
            console.log(fromDate)
            console.log(toDate)
            const allertMessage = "Please select a Date!"
            if (fromDate === undefined){
                return {
                    message: allertMessage
                }

            } else if (toDate === undefined){
                return {
                    message: allertMessage
                }

            } else {

                return {
                    message: ""
                }
            }
        })

    }

    start() {

    }

}
