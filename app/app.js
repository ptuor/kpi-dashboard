// init project
let count = 0;
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

mongodb.MongoClient.connect(uri, {
    useUnifiedTopology: true
}, (err, client) => {

    //log error if any connection error occurred
    if (err) return console.log(err)

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
    /* let dataToSend = {
         "oee": result[0].oee,
         "ava": result[0].ava,
         "eff": result[0].eff,
         "qua": result[0].qua
     }*/
    res.render("index");
});

//Responds to GET requests to the root route ('/polling')
app.get('/polling', (req, res) => {
    if (count === 5) {
        count = 0;
    }
    res.send(result[count])
    count++
})

// route all requests to router
const router = require('./router/router.js')
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', router)




// listen for requests on port 3000
const port = 3000;
const listener = app.listen(port, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});