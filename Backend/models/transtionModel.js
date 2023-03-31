const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);
