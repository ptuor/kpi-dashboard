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
router.get('/1', controller.getLatestOeeValue)


module.exports = router

