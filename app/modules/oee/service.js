
const oeeDb = require('../../models/oeeExample.js')


const getAllValues = (callback) => {
    try {
        oeeDb.getData({}, (result)=> callback(result))
    } catch (e) {
        console.log(e)
        throw new Error(e.message)

    }
}

const getLastElementFromArray = (array = []) => {
    if (array.length === 0) {
        return undefined
    }else {
        return(array.slice(-1)[0])
    }


}

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

module.exports = {
    getAllValues,
    getValuesByDate,
    getLastElementFromArray
}








