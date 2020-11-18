const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: [true, 'FirstName is required']
    },
    LastName: {
        type: String,
        required: [true, 'LastName is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email exists, try Another!'],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        },
    },
    phoneNum: {
        type: Number,
        validate(value) {
            if (value && value.toString().length !== 10) {
                throw new Error('phone number length should be 10')
            }
        }
    },
    image: {
        type: Buffer
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User