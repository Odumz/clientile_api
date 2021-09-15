const mongoose = require('mongoose');

// create profile schema & model
const Schema = mongoose.Schema;

const ProviderSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    }
},
{
    timestamps: true
}
);

const Provider = mongoose.model('providers', ProviderSchema);

module.exports = Provider;