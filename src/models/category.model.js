const mongoose = require('mongoose')
const { Schema } = mongoose

const CategorySchema = new Schema({
    category_name: { type: String, required: true, trim: true },
})

module.exports = mongoose.model('category', CategorySchema, 'categories')