const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['admin', 'member', 'ban'],
        default: 'member',
    },
    balance: {
        type: Number,
        default: 0
    },
    token: {
        type: String,
        default: null
    },
    createAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('User', userSchema);