const mongoose = require('mongoose');

// create profile schema & model
const Schema = mongoose.Schema;

const ProviderSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
},
{
    timestamps: true
}
);

const Provider = mongoose.model('provider', ProviderSchema);

module.exports = Provider;