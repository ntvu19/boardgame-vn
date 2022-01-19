const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    details: {
        type: String, // json
    },
    image: [{
        type: String
    }],
    category: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    related: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }]
});

module.exports = mongoose.model('products', ProductSchema);