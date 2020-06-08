// init project
const express = require('express');
const app = express();
app.use(express.static('./'));
/* app.use(require("cors")()) // allow Cross-domain requests
app.use(require('body-parser').json()) // When someone sends something to the server, we can recieve it in JSON format */

//handlebars
const hbs = require('express-handlebars');
const path = require('path');
app.engine("handlebars", hbs({
    defaultLayout: "index",
    layoutsDir: path.join(__dirname, "../views")
}))
app.set("view engine", "handlebars");

//MongoDB
mongodb = require("mongodb");
uri = "mongodb+srv://ibw:kpi2semester@dbkpi-rcc66.gcp.mongodb.net";
const result = [];

mongodb.MongoClient.connect(uri, (err, client) => {

    const db = client.db("kpiData");
    const collection = db.collection("kpiValues");

    let data = collection.find();
    data.forEach((doc) => {
        result.push(doc)
    }, () => {
        client.close();
        console.log(result);
    });
});

//Responds to GET requests to the root route ('/')
app.get("/", (req, res) => {
    let dataToSend = {
        "ava": result[0].ava,
        "eff": result[0].eff
    }
    res.render("index", dataToSend);
});

// listen for requests on port 3000
const port = 3000;
var listener = app.listen(port, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});