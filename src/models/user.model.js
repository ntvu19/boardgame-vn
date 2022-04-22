const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    email: { type: String, trim: true, default:'' },
    fullName: { type: String, required: true, trim: true, default:'' },
    phone: {String, default:''},
    address: {String, default: ''},
    avatar: {String, default:''},
    gender: { type: Boolean, default: true }, // True => Male
    blocked: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    createAt: { type: Date, default: Date.now },
    token: String
})

module.exports = mongoose.model('users', UserSchema)