const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    product: { type: String, required: true },  
    contact: { type: String, required: true },
    leaseOptions: [
        {
            duration: String,  
            pricePerAcre: Number,  
            availability: Boolean   
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Seller', sellerSchema);
