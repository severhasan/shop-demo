const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    orders: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date_joined: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);