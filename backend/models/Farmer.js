const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    area: { type: String, required: true },
    landArea: { type: Number, required: true }, // in acres
    phone: { type: String, required: true, unique: true }
}, { timestamps: true });

const Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;
