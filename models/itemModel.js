const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String },
    seller: { type: mongoose.Types.ObjectId, ref: 'Seller' },
    price: { type: Number},
    description: { type: String},
    rating: { type: Number, default: 5 },
    images: [
        { type: String }
    ],
    tenantId: {
        type: mongoose.Types.ObjectId, ref: 'Tenant'
    }

}, {
    timestamps: true
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item