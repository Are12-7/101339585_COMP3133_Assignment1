// Carlos Arellano - 101339585
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
})

const User = mongoose.model("User", UserSchema);
module.exports = User;