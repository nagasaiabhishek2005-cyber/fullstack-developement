const mongoose = require('mongoose');

// Mongoose Schema Definition
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Item name is required']
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);