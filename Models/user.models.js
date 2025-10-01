const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        require: true
    },
    password: {
        type: String,
        require: true
    },
    todos: [{
        type: mongoose.Types.ObjectId,
        ref: "todos"
    }]
})

user.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
module.exports = mongoose.model("users", user);