/****************************/
/* OEE - service            */
/****************************/

// init example database - for real production this need to be change to real database
const oeeDb = require('../../models/oeeExample.js')


// get all values and use callback function
const getAllValues = (callback) => {

    try {
        oeeDb.getData({}, (result)=> callback(result))
    } catch (e) {
        console.log(e)
        throw new Error(e.message)
    }
}


// get las element from array
const getLastElementFromArray = (array = []) => {

    if (array.length === 0) {
        return undefined
    }else {
        return(array.slice(-1)[0])
    }
}


// get OEE values by date query
const getValuesByDate = (callback, fromDate, toDate) => {

    const query = {
        createdAt: {
            $gte: new Date(fromDate),
            $lte: new Date(toDate)
        }
    }

    try {
        oeeDb.getDataByQuery(query, (result)=> callback(result))
    } catch (e) {
        console.log(e)
        throw new Error(e.message)

    }
}


// export methods
module.exports = {
    getAllValues,
    getValuesByDate,
    getLastElementFromArray
}








