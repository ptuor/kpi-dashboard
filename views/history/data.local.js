export default class Data {
    constructor(useReturnValues = false) {
        this.useReturnValues = useReturnValues

        this.returnValues = [
            {
                _id:1,
                ava:12,
                eff:16,
                qua:25,
                createdAt: new Date().toISOString()
            },            {
                _id:2,
                ava:50,
                eff:56,
                qua:70,
                createdAt: new Date().toISOString()
            }
        ]
    }

    async getValuesByDates(fromDate, toDate){
            if (this.useReturnValues){
                return this.returnValues
            }else{
                return []
            }


    }
}