const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    businessName: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    products: [{ type: String }] 
}, { timestamps: true });

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
