/****************************/
/* App - main router        */
/****************************/

// init router
const express = require('express')
const router = express.Router()


// route handlers for all /oee requests
const oeeRouter  = require('../modules/oee/routes.js')
router.use('/oee', oeeRouter)


// export main router
module.exports = router

