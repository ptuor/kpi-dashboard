
const oeeDb = require('../../models/oeeExample.js')
let count = 0;


const getJSON = (callback) => {
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



module.exports = {
    getJSON,
    getLastElementFromArray
}








