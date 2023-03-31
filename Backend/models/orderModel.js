const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    },
    total: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Order', orderSchema);
