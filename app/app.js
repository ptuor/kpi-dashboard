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



/*******************************************************/
// routes
/*******************************************************/

//Responds to GET requests to the root route ('/')
app.get("/", (req, res) => {
    res.render("index");
});


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