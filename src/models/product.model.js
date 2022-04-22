const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductSchema = new Schema({
    name: { type: String, trim: true, required: true },
    price: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
    /**
     * @typeValue
     * 0 - family,      1 - children,       2 - vietnam,        3 - usa
     * 4 - group,       5 - tactics,        6 - flag,           7 - accessories
     */
    type: { type: Number, required: false },
    stock: { type: Number, required: false, default: 0 },
    sold: { type: Number, required: false, default: 0 },
    conditions: {
        numberOfPlayer: String,
        idealNumberOfPlayer: String,
        playingTime: String,
        age: String,
        genres: { type: Array, genre: String },
        mechanisms: { type: Array, mechanism: String }
    }, 
    photo: {
        type: Array,
        url: String,
        default: []
    },
    details: {
        keys: { type: Array, key: String, trim: true },
        values: { type: Array, value: String, trim: true }
    },
    description: String,
    rules: String
})

module.exports = mongoose.model('products', ProductSchema)