/**
 *  Create a connection function for mongodb
 *  Start a local mongodb server connection
 *  Test for database connection
 */

// constants
const express = require('express');
const router = express.Router();
const { errorRes, successRes } = require('../utils/responseHandler');

// require routes
router.get('/', (req, res) => successRes(res, 200, { message: 'Welcome to the Protranslating API v1.0!'}));


module.exports = router;