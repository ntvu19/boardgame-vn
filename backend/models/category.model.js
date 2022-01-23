const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }]
});

module.exports = mongoose.model('categories', CategorySchema);