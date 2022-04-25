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
        numberOfPlayer: { type:String, default: '' },
        playingTime: { type:String, default: '' },
        age: { type:String, default: '' },
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
    rules: String,
    traffic: {type: Number, default: 0}
})

module.exports = mongoose.model('products', ProductSchema)