const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String, 
    },
    phone: { 
        type: String, 
    },
    status: {
        type: String,
        enum: ['admin', 'member', 'ban'],
        default: 'member',
    },
    token: {
        type: String,
        default: null,
    },
    createAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('User', userSchema);