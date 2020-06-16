//init service
const service = require('./service.js')


const getAllOeeValues = async (req, res, next) => {

     if (req.accepts('application/json')){
         try {
             service.getJSON((values) => {
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

const getLatestOeeValue = async (req, res, next) => {

    if (req.accepts('application/json')){
        try {
            service.getJSON((values) => {
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


module.exports = {
    getAllOeeValues,
    getLatestOeeValue
}


