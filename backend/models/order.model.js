const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: String
    }],
    address: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    state: {
        type: String,
        enum: ['Chờ thanh toán', 'Chờ nhận hàng', 'Đang giao', 'Đã giao', 'Đánh giá'],
        default: 'Chờ thanh toán'
    },
    estimate: {
        type: Date
    }
});

module.exports = mongoose.model('orders', OrderSchema);