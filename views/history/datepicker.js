
export class Datepicker{
constructor(rootSelector) {
    this.datePickerFrom = flatpickr(rootSelector + " .basicDate", {
        enableTime: true,
        "maxDate": new Date().fp_incr(0),
        time_24hr: true,
        dateFormat: "d.m.Y H:i"
    });

    console.log(rootSelector)
    const refreshDates = document.querySelector(rootSelector + " .selectDate")
    this.addRfreshEventlistener(refreshDates)
}



addRfreshEventlistener(button){
    button.addEventListener('click', (evt)=>{
        console.log(this.datePickerFrom.selectedDates[0])
    })
}
}