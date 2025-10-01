const mongoose = require('mongoose');
const todo = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    }
})

module.exports = mongoose.model("todos", todo)