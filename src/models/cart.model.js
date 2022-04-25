const mongoose = require('mongoose')
const { Schema } = mongoose

const CartSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    products: [new Schema({
        productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'products' },
        quantity: { type: Number, default: 0 }
    })]
})

module.exports = mongoose.model('cart', CartSchema, 'cart')