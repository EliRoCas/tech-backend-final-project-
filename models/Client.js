const mongoose = require('mongoose');

// Este modelo debe ser igual a lo que tenga la DB 
// Se define un esquema (clientSchema) utilizando mongoose.Schema().
const clientSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    idCard: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    adress: {
        type: String,
        require: true
    }
},
    {
        versionkey: false
    }
);

module.exports = mongoose.model('Client', clientSchema);