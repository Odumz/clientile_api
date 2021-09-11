/**
 *  Create a connection function for mongodb
 *  Start a local mongodb server connection
 *  Test for database connection or disconnection
 */

// import models
const Client = require('../models/clients');


class clientController {
    // get all clients and send response
    static async getAll(req, res, next) {
        // console.log("request:", req.user);
        let conditions = {};
        
        if (req.query.name) {
            conditions.name = req.query.name
        }
        if (req.query.email) {
            conditions.email = req.query.email
        }
        if (req.query.phone) {
            conditions.phone = req.query.phone
        }

        // console.log(conditions)
        // console.log(req.query)
        
        Client.find(conditions)
        .select('_id name email provider phone')
        .exec()
        .then(clients => {
            if (clients == '') {
                return res.status(404).json({
                    message: 'No client data found'
                })
            }
            const response = {
                message: 'All clients successfully fetched',
                count: clients.length,
                client: clients.map(client => {
                    return {
                        _id: client._id,
                        name: client.name,
                        email: client.email,
                        phone: client.phone,
                        provider: client.provider
                    }
                })
            };
            res.status(200).send(response);
        }).catch(err => {
            return res.status(500).json({ message: err });
        });
    }

    // get an client
    static async get(req, res, next) {
        Client.findOne({_id: req.params.id})
            .select('_id name email provider phone')
            .then(client => {
                if (!client) {
                    return res.status(404).json({
                        message: 'Error! client not found'
                    })
                }

                const response = {
                    message: 'client successfully fetched',
                    client: client
                };
            res.status(200).send(response);
        }).catch(next);
    }

    // add an client
    static async add(req, res, next) {
        console.log('client', req.body);
        const { name, email, provider, phone } = req.body;

        await Client.findOne({ email }).then(client => {
            if (client) {
                return res.status(400).json({
                    message: 'Client already exists'
                });
            } else {
                const newClient = new Client({
                    name,
                    email,
                    phone,
                    provider
                });
                newClient.save().then(client => {
                    const response = {
                        message: 'Client added successfully',
                        client: {
                            _id: client._id,
                            name: client.name,
                            email: client.email,
                            phone: client.phone,
                            provider: client.provider
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

    // edit a client
    static async edit(req, res, next) {
        const { name, email, phone, provider } = req.body;

        await Client.findOneAndUpdate({_id: req.params.id}, {
            name,
            email,
            phone,
            provider
        }).then(() => {
            Client.findOne({_id: req.params.id})
            .select('_id name email provider phone')
            .then(client => {
                if (!client) {
                    return res.status(404).json({
                        message: 'Error! Client not found'
                    })
                }
                const response = {
                    message: 'Client updated successfully',
                    client: client
                }
                res.status(200).send(response);
            })    
        }).catch(err => {
            return res.status(500).json({ message: err });
        })
    }

    // delete a client
    static async delete(req, res) {
        Client.findOneAndDelete({_id: req.params.id})
            .select('_id name email provider phone')
            .then(client => {
                if (!client) {
                    return res.status(404).json({
                        message: 'Error! Client not found'
                    })
                }
                const response = {
                    message: 'Client deleted successfully',
                    client: 'item no longer exists'
                }
                res.status(200).send(response);
        }).catch(err => {
            return res.status(500).json({ message: err });
        })
    }
}


module.exports = clientController;