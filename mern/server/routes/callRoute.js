const express = require('express')
const {requireAuth,userMiddleware} = require('../middleware/requireAuth')
const { callClient } = require('../controllers/clientController');

const router = express.Router()



router.post("/callClient", callClient);


module.exports = router;