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
        db.collection("kpiValues").find(query).toArray().then(results => callback(results) )

    })

}

module.exports = {
    getData
}
