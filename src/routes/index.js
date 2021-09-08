/**
 *  Create a connection function for mongodb
 *  Start a local mongodb server connection
 *  Test for database connection
 */

// constants
const express = require('express');
    router = express.Router(),
    { successRes } = require('../utils/responseHandler'),
    clientRoutes = require('./clientRoutes'),
    providerRoutes = require('./providerRoutes'),

// require routes
router.get('/', (req, res) => successRes(res, 200, { message: 'Welcome to the Protranslating API v1.0!'}));

// initialize the client routes
router.use('/clients', clientRoutes);

// initialize the provider routes
router.use('/providers', providerRoutes);


module.exports = router;