const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        // url || enum
    },
    role: {
        type: String,
        enum: ['Administrator', 'User'],
        default: 'User'
    },
    information: {
        name: String,
        address: String,
        phone: String
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'orders'
    }],
    active: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    blocked: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    token: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('users', userSchema);