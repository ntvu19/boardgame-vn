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
        enum: ['Administrator', 'User']
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    information: {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
        },
        phone: {
            type: String,
            require: true
        }
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'orders'
    }]
});

module.exports = mongoose.model('users', userSchema);