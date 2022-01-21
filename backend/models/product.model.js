const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    details: {
        type: String, // json
    },
    image: [{
        type: String
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
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