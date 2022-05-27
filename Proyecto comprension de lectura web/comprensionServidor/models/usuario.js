const {model, Schema} = require('mongoose');

const UsuarioSchema = new Schema({
    nombres: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    colegio: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

module.exports = model('Usuario', UsuarioSchema);