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
        required: true,
    },
    provider: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: "provider"
    },
},
{
    timestamps: true
}
);

const Client = mongoose.model('client', ClientSchema);

module.exports = Client;