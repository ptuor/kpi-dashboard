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
                newValue.ava = lastValue.ava + 3
            }else{
                newValue.ava = 0
            }

            if (lastValue.eff < 95){
                newValue.eff = lastValue.eff + 5
            }else{
                newValue.eff = 0
            }

            if (lastValue.qua < 95){
                newValue.qua = lastValue.qua + 7
            }else{
                newValue.qua = 0
            }

            newValue.oee = ((newValue.ava * newValue.eff * newValue.qua) / 10000)

            collection.insertOne(newValue)
            callback(results)
        } )


    }catch (err) {
        console.log(err)
    }


}




const getDataByQuery = async (query, callback) =>{
    try {
        collection.find(query).toArray().then(results => {
            callback(results)
        } )
    }catch (err) {
        console.log(err)
    }



}


module.exports = {
    getData,
    getDataByQuery
}
