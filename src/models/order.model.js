const mongoose = require('mongoose')
const { Schema } = mongoose

const OrderSchema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    deliveryAddress: {
        name: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true, maxlength: 10 },
        address: { type: String, required: true }
    },
    orderProducts: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'products' },
    numOfProducts: { type: Number, required: true, default: 1 },
    orderStatus: {
        type: String,
        enum: ['Chờ thanh toán', 'Đang lấy hàng', 'Đang giao hàng', 'Giao hàng thành công'],
        required: true,
        default: 'Chờ thanh toán'
    },
    transportFee: { type: Number, required: true, default: 0 },
    note: { type: String, trim: true, maxlength: 50 }
})

module.exports = mongoose.model('orders', OrderSchema)