/**
 *  Create a connection function for mongodb
 *  Start a local mongodb server connection
 *  Test for database connection or disconnection
 */

// import models
const Provider = require('../models/providers');

class providerController {
    // get all providers and send response
    static async getAll(req, res) {
        // console.log("request:", req.user);
        let conditions = {};
        
        if (req.query.name) {
            conditions.name = req.query.name
        }
        
        Provider.find(conditions)
        .select('_id name')
        .exec()
        .then(providers => {
            if (providers == '') {
                return res.status(404).json({
                    message: 'No provider data found'
                })
            }
            const response = {
                message: 'All providers successfully fetched',
                count: providers.length,
                provider: providers.map(provider => {
                    return {
                        _id: provider._id,
                        name: provider.name
                    }
                })
            };
            res.status(200).send(response);
        }).catch(err => {
            return res.status(500).json({ message: err });
        });
    }

    // get a provider
    static async get(req, res, next) {
        Provider.findOne({_id: req.params.id})
            .select('_id name')
            .then(provider => {
                if (!provider) {
                    return res.status(404).json({
                        message: 'Error! provider not found'
                    })
                }

                const response = {
                    message: 'provider successfully fetched',
                    provider: provider
                };
            res.status(200).send(response);
        }).catch(next);
    }

    // add a provider
    static async add(req, res) {
        console.log('provider', req.body);
        const { name } = req.body;

        await Provider.findOne({ name }).then(provider => {
            if (provider) {
                return res.status(409).json({
                    message: 'Error! Provider already exists'
                })
            } else {
            const newProvider = new Provider({ name });
            newProvider.save().then(provider => {
                const response = {
                    message: 'Provider added successfully',
                    provider: {
                        _id: provider._id,
                        name: provider.name
                    }
                }
                res.status(201).send(response);
            }).catch(err => {
                return res.status(500).json({ message: err });
            });
        }
        }).catch(err => {
            return res.status(500).json({ message: err });
        })
    }
    // return res.status(500).json({ message: err });

    // edit a provider
    static async edit(req, res, next) {
        const { name } = req.body;

        await Provider.findOneAndUpdate({_id: req.params.id}, {name}).then(provider => {
            Provider.findOne({_id: req.params.id})
            .select('_id name')
            .then(provider => {
                if (!provider) {
                    return res.status(404).json({
                        message: 'Error! Provider not found'
                    })
                }
                const response = {
                    message: 'Provider updated successfully',
                    provider: provider
                }
                res.status(200).send(response);
            }).catch(err => {
                return res.status(500).json({ message: err });
            });
        });
    }

    // delete a provider
    static async delete(req, res) {
        Provider.findOneAndDelete({_id: req.params.id})
            .select('_id name')
            .then(provider => {
                if (!provider) {
                    return res.status(404).json({
                        message: 'Error! Provider not found'
                    })
                }
                const response = {
                    message: 'Provider deleted successfully',
                    provider: 'item no longer exists'
                }
                res.status(200).send(response);
        }).catch(err => {
            return res.status(500).json({ message: err });
        })
    }
}


module.exports = providerController;