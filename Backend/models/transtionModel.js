const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    transaction_date: {
        type: Date,
        default: Date.now,
    },
    transaction_amount: {
        type: Number,
        require: true,
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);