//MongoDB
mongodb = require("mongodb");
uri = "mongodb+srv://ibw:kpi2semester@dbkpi-rcc66.gcp.mongodb.net";
let collection

mongodb.MongoClient.connect(uri, {useUnifiedTopology: true},(err, client) => {

    //log error if any connection error occurred
    if (err) return console.log(err)

    const db = client.db("kpiData");
    collection = db.collection("kpiValues");
});



const getData = async (query, callback) =>{
    mongodb.MongoClient.connect(uri, {useUnifiedTopology: true},(err, client) => {

        //log error if any connection error occurred
        if (err) return console.log(err)
        const db = client.db("kpiData");
        db.collection("kpiValues").find(query).toArray().then(results => {
            let lastValue = results.slice(-1)[0]
            if (lastValue.oee < 95){
                lastValue.oee = lastValue.oee + 1
            }else{
                lastValue.oee = 0
            }

            if (lastValue.ava < 95){
                lastValue.ava = lastValue.ava + 3
            }else{
                lastValue.ava = 0
            }

            if (lastValue.eff < 95){
                lastValue.eff = lastValue.eff + 5
            }else{
                lastValue.eff = 0
            }

            if (lastValue.qua < 95){
                lastValue.qua = lastValue.qua + 7
            }else{
                lastValue.qua = 0
            }

            lastValue._id = lastValue._id + 1
            lastValue.createdAt = new Date()

            db.collection("kpiValues").insertOne(lastValue)
            callback(results)
        } )

    })

}




const getDataByQuery = async (query, callback) =>{
    mongodb.MongoClient.connect(uri, {useUnifiedTopology: true},(err, client) => {

        //log error if any connection error occurred
        if (err) return console.log(err)
        const db = client.db("kpiData");
        db.collection("kpiValues").find(query).toArray().then(results => {
            callback(results)
        } )

    })

}


module.exports = {
    getData,
    getDataByQuery
}
