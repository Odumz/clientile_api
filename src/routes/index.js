/**
 *  Create a connection function for mongodb
 *  Start a local mongodb server connection
 *  Test for database connection
 */

// constants
const express = require('express');
    router = express.Router(),
    { successRes } = require('../utils/responseHandler'),
    providerRoutes = require('./providerRoutes'),
    clientRoutes = require('./clientRoutes');

// require routes
router.get('/', (req, res) => successRes(res, 200, { message: 'Welcome to the Clientelle API v1.0!'}));

// initialize the client routes
router.use('/clients', clientRoutes);

// initialize the client routes
router.use('/providers', providerRoutes);

module.exports = router;