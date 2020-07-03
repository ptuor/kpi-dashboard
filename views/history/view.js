/****************************/
/* view                     */
/****************************/

export default class View {

    // constructor - create charts and date picker
    constructor(datePickerRootSelector, charts){

        this.charts = charts

        // setup datepicker
        let datePickerFrom = flatpickr(datePickerRootSelector + " .fromDate", {
            enableTime: true,
            time_24hr: true,
            "maxDate": new Date().fp_incr(0),
            dateFormat: "d.m.Y H:i",
            onClose: (selectedDates, dateStr, instance) => {
                datePickerTo.set('minDate', dateStr)
                this.dateFrom = selectedDates[0]
            }
        });

        // setup datepicker
        let datePickerTo = flatpickr(datePickerRootSelector + " .toDate", {
            enableTime: true,
            "maxDate": new Date().fp_incr(0),
            time_24hr: true,
            dateFormat: "d.m.Y H:i",
            onClose: (selectedDates, dateStr, instance) => {
                datePickerFrom.set('maxDate', dateStr)
                this.dateTo = selectedDates[0]
            }
        });

        // add event listener
        const refreshDates = document.querySelector(datePickerRootSelector + " .refreshDate")
        this.addRefreshEventListener(refreshDates)


        this.charts.createChart("OEE", 0)
        this.charts.createChart("AVA", 0)
        this.charts.createChart("EFF", 0)
        this.charts.createChart("QUA", 0)
        this.charts.createTrend(0, 0, 0, 0)
    }


    addRefreshEventListener(button){
        button.addEventListener('click', async (evt)=>{
            const result = await this.onRefreshHandler(this.dateFrom, this.dateTo)
            if (result.message !== ""){
                alert(result.message)
            }
        })
    }


    registerRefreshHandler(onRefreshHandler){
        this.onRefreshHandler = onRefreshHandler
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

}


