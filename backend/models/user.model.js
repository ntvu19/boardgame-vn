const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
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
    createAt: {
        type: Date,
        default: Date.now
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
    token: String
});

module.exports = mongoose.model('users', userSchema);