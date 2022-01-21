const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('comments', CommentSchema);