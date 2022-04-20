const mongoose = require('mongoose')
const { Schema } = mongoose

const AdministratorSchema = new Schema({
    username: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    fullName: { type: String, required: true, trim: true },
    phone: String,
    address: String,
    gender: { type: Boolean, default: true },
    active: { type: Boolean, default: false },
    createAt: { type: Date, default: Date.now },
    token: String
})

module.exports = mongoose.model('administrators', AdministratorSchema)