const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNum: {
        type: Number
    },
    image: {
        type: Buffer
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User