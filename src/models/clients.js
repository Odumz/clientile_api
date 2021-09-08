const mongoose = require('mongoose');

// create profile schema & model
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    provider: {
        type: Array,
        required: true
    },
},
{
    timestamps: true
}
);

const Client = mongoose.model('client', ClientSchema);

module.exports = Client;