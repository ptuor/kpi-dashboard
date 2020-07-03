/****************************/
/* example Database mongoDB */
/****************************/

//init
mongodb = require("mongodb");
uri = "mongodb+srv://ibw:kpi2semester@dbkpi-rcc66.gcp.mongodb.net";
let collection


//connect to mongoDB
mongodb.MongoClient.connect(uri, {useUnifiedTopology: true},(err, client) => {

    //log error if any connection error occurred
    if (err) return console.log(err)

    const db = client.db("kpiData");
    collection = db.collection("kpiValues");
});


// get all data from mongo db, insert new entry while getting new data --> this simulate a machine which inserts new values to database
const getData = async (query, callback) =>{

    try {
        collection.find(query).toArray().then(results => {
            let lastValue = results.slice(-1)[0]

            const date = new Date()
            date.setHours(date.getHours() + 2)

            let newValue = {
                ava:12,
                eff:16,
                qua:25,
                createdAt: date
            }

            if (lastValue.ava < 95){
                newValue.ava = lastValue.ava + 2.6
            }else{
                newValue.ava = 0
            }

            if (lastValue.eff < 95){
                newValue.eff = lastValue.eff + 3.4
            }else{
                newValue.eff = 0
            }

            if (lastValue.qua < 95){
                newValue.qua = lastValue.qua + 6.1
            }else{
                newValue.qua = 0
            }

            newValue.oee = ((newValue.ava * newValue.eff * newValue.qua) / 10000)

            collection.insertOne(newValue)
            results.push(newValue)
            callback(results)
        } )
    }catch (err) {
        console.log(err)
    }
}


// get values by query
const getDataByQuery = async (query, callback) =>{

    try {
        collection.find(query).toArray().then(results => {
            callback(results)
        } )
    }catch (err) {
        console.log(err)
    }

}


// export methods
module.exports = {
    getData,
    getDataByQuery
}
