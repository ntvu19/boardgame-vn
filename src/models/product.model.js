const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductSchema = new Schema({
    name: { type: String, trim: true, required: true },
    price: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'category'
    },
    stock: { type: Number, required: false, default: 0 },
    sold: { type: Number, required: false, default: 0 },
    conditions: {
        numberOfPlayer: { Number, default: 0 },
        idealNumberOfPlayer: { Number, default: 0 },
        playingTime: { Number, default: 0 },
        age: { Number, default: 0 },
        genres: { type: Array, genre: String, default: [] },
        mechanisms: { type: Array, mechanism: String, default: [] }
    },
    photo: {
        type: Array,
        url: String,
        default: []
    },
    details: {
        keys: { type: Array, key: String, trim: true, default: '' },
        values: { type: Array, value: String, trim: true, default: '' }
    },
    description: String,
    rules: String
})

module.exports = mongoose.model('products', ProductSchema)