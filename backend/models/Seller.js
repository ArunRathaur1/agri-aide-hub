const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    products: [
        {
            name: { type: String, required: true },  // Product name
            // image: { type: String, required: false }, // Image URL for the product
            leaseOptions: [
                {
                    duration: String,  // Lease duration (e.g., "6 months", "1 year")
                    pricePerAcre: Number,  // Price for lease per acre
                    availability: Boolean   // Whether the lease is available
                }
            ]
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Seller', sellerSchema);
