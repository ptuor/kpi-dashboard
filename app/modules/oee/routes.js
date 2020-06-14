// init /oee router
const express = require('express')
const router = express.Router()

// init controller
const controller  = require('./controller.js')

// route handlers for all /oee requests
router.get('/', controller.getAllOeeValues)

module.exports = router

