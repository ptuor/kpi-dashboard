/****************************/
/* OEE - controller         */
/****************************/

//init service
const service = require('./service.js')


// get all OEE values
const getAllOeeValues = async (req, res, next) => {

     if (req.accepts('application/json')){
         try {
             service.getAllValues((values) => {
                 res.send(values)
             })

         }catch (e) {
             console.log(e)
             res.sendStatus(500)
         }
     } else {
         res.sendStatus(406)
     }
}


// get last OEE value
const getLatestOeeValue = async (req, res, next) => {

    if (req.accepts('application/json')){
        try {
            service.getAllValues((values) => {
                const value = service.getLastElementFromArray(values)
                res.send(value)
            })

        }catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    } else {
        res.sendStatus(406)
    }

}


// get OEE values by date query
const getValuesByDate = async (req, res, next) => {

    if (req.accepts('application/json')){
        const fromDate = req.query.from
        const toDate = req.query.to
        try {
            service.getValuesByDate((values) => {res.send(values)}, fromDate, toDate)
        }catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    } else {
        res.sendStatus(406)
    }

}


// export methods
module.exports = {
    getAllOeeValues,
    getLatestOeeValue,
    getValuesByDate
}


