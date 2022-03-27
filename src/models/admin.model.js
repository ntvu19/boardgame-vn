const mongoose = require('mongoose')
const { Schema } = mongoose

const AdministratorSchema = new Schema({
    username: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    fullName: { type: String, required: true, trim: true },
    birthday: { type: String, default: '1970-01-01' },
    phone: String,
    address: String,
    avatar: String,
    active: { type: Boolean, default: false },
    gender: { type: Boolean, default: true },
    createAt: { type: Date, default: Date.now },
    token: String
})

module.exports = mongoose.model('administrators', AdministratorSchema)