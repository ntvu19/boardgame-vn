const mongoose = require('mongoose')
const { Schema } = mongoose

const OrderSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true, maxlength: 10 },
    address: { type: String, required: true },
    products: [new Schema({
        productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'products' },
        quantity: Number
    })],
    deliveryMethod: String,
    paymentMethod: String,
    status: {
        type: String,
        enum: ['Chờ thanh toán', 'Đang giao hàng', 'Thành công'],
        required: true,
        default: 'Chờ thanh toán'
    },
    createAt: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('orders', OrderSchema)