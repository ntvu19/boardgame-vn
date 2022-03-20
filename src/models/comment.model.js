const mongoose = require('mongoose')
const { Schema } = mongoose

const CommentSchema = new Schema({
    author: { type: String, required: true, trim: true },
    productId: { type: Schema.Types.ObjectId, required: true },
    time: { type: Date, default: Date.now, required: true },
    content: { type: String, trim: true, maxlength: 60 }
})

module.exports = mongoose.model('comments', CommentSchema)