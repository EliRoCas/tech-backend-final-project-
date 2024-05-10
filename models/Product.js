const mongoose = require('mongoose');

// Modelo/Schema para productos 

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    over18: {
        type: Boolean,
        require: true,
    }
});

module.exports = mongoose.model('Product', productSchema); 
