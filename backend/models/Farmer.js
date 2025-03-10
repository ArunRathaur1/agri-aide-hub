const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    area: { type: String, required: true },
    landArea: { type: Number, required: true },
    phone: { type: String, required: true, unique: true },
    farmingHistory: [
        {
            cropName: String,
            costIncurred: Number,
            profitEarned: Number,
            cultivationDate: Date
        }
    ]
});

module.exports = mongoose.model('Farmer', farmerSchema);
