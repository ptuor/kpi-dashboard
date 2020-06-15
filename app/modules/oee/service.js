
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

const getLatestElementFromArray = (array = []) => {
    count++
    if (count === 5) {
        count = 0;
    }

    return(array[count])

}



module.exports = {
    getJSON,
    getLatestElementFromArray
}








