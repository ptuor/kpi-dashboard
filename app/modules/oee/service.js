
const oeeDb = require('../../models/oeeExample.js')



    const getJSON = (callback) => {
        try {
            oeeDb.getData({}, (result)=> callback(result))
        } catch (e) {
            console.log(e)
            throw new Error(e.message)

        }
    }


    module.exports = {
        getJSON
    }








