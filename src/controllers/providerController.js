/**
 *  Create a connection function for mongodb
 *  Start a local mongodb server connection
 *  Test for database connection or disconnection
 */

// import models
const provider = require('../models/providers');

class providerController {
    // get all providers and send response
    static async getAll(req, res, next) {
        // console.log("request:", req.user);
        let conditions = {};
        
        if (req.query.name) {
            conditions.name = req.query.name
        }
        
        provider.find(conditions)
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

    // get an provider
    static async get(req, res, next) {
        provider.findOne({_id: req.params.id})
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

    // add an provider
    static async add(req, res, next) {
        console.log('provider', req.body);
        await provider.create({
            ...req.body
        }).then(provider => {
            console.log(provider);
            const response = {
                message: "New provider created",
                provider: {
                    _id: provider._id,
                    name: provider.name
                }
            }
            return res.status(201)
                .send(response);
        }).catch(next);
    }
    // return res.status(500).json({ message: err });

    // edit a provider
    static async edit(req, res, next) {
        await provider.findOneAndUpdate({_id: req.params.id}, req.body).then(provider => {
            provider.findOne({_id: req.params.id})
            .select('_id name')
            .then(provider => {
                if (!provider) {
                    return res.status(404).json({
                        message: 'Error! provider not found'
                    })
                }
                const response = {
                    message: 'provider updated successfully',
                    provider: provider
                }
                res.status(200).send(response);
            }).catch(err => {
                return res.status(500).json({ message: err });
            });
        });
    }

    // delete a provider
    static async delete(req, res, next) {
        provider.findOneAndDelete({_id: req.params.id})
            .select('_id name email country')
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
        });
    }
}


module.exports = providerController;