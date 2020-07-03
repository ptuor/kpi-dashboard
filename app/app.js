/****************************/
/* Application              */
/****************************/

// init project
const express = require('express');
const favicon = require('serve-favicon')
const app = express();
const path = require('path');
app.use(express.static('./'));

// return favicon for each page
app.use(favicon(path.join(__dirname, '../views', 'favicon.ico')))


/*******************************************************/
// routes
/*******************************************************/

//Responds to GET requests to the root route ('/')
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/current", "index.html"));
});

// route all other requests to main router
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