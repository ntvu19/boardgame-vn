const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    quantity: {
        type: String
    },
    price: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    create: {
        type: Date,
        default: Date.now
    },
    state: {
        type: String,
        enum: ['Thanh toán', 'Đang chờ', 'Đang giao', 'Đã giao', 'Đánh giá']
    }
});

module.exports = mongoose.model('orders', OrderSchema);