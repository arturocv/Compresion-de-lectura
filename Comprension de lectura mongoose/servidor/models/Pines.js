const mongoose = require('mongoose');

const PinesSchema = mongoose.Schema({
    estado: {
        type: String
    },
    pin: {
        type: String,
        unique: true
    },
    texto: {
        type: String
    }

},{_id: false})

module.exports = mongoose.model('Pines', PinesSchema);