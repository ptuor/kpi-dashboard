// init router
const express = require('express')
const router = express.Router()


// route handlers for all /oee requests
const oeeRouter  = require('../modules/oee/routes.js')
router.use('/oee', oeeRouter)


module.exports = router

