/****************************/
/* OEE - router             */
/****************************/

// init /oee router
const express = require('express')
const router = express.Router()

// init controller
const controller  = require('./controller.js')


/*******************************************************/
// route handlers for all /oee requests
/*******************************************************/
// get all oee values
router.get('/', controller.getAllOeeValues)

// get last oee value
router.get('/live', controller.getLatestOeeValue)

// get history
router.get('/history', controller.getValuesByDate)


// export methods
module.exports = router

