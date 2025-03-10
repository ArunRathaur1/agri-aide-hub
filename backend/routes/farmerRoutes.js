const express = require('express');
const Farmer = require('../models/Farmer');

const router = express.Router();

// ✅ Create a new farmer
router.post('/', async (req, res) => {
    try {
        const { name, area, landArea, phone, farmingHistory = [] } = req.body;

        // Validate input fields
        if (!name || !area || !landArea || !phone) {
            return res.status(400).json({ message: 'All fields are required (name, area, landArea, phone)' });
        }

        const newFarmer = new Farmer({ name, area, landArea, phone, farmingHistory });
        await newFarmer.save();
        res.status(201).json({ message: 'Farmer added successfully!', farmer: newFarmer });

    } catch (error) {
        res.status(500).json({ message: 'Error adding farmer', error: error.message });
    }
});

// ✅ Add Farming History to an Existing Farmer
router.patch('/:id/history', async (req, res) => {
    try {
        const { cropName, costIncurred, profitEarned, cultivationDate } = req.body;
        const { id } = req.params;

        // Validate input
        if (!cropName || !costIncurred || !profitEarned || !cultivationDate) {
            return res.status(400).json({ message: 'All fields are required for farming history' });
        }

        const farmer = await Farmer.findById(id);
        if (!farmer) {
            return res.status(404).json({ message: 'Farmer not found' });
        }

        farmer.farmingHistory.push({
            cropName,
            costIncurred,
            profitEarned,
            cultivationDate: new Date(cultivationDate) // Ensure it's stored as a Date object
        });

        await farmer.save();

        res.status(200).json({ message: 'Farming history updated!', farmer });

    } catch (error) {
        res.status(500).json({ message: 'Error updating history', error: error.message });
    }
});

// ✅ Get all farmers
router.get('/', async (req, res) => {
    try {
        const farmers = await Farmer.find();
        res.status(200).json(farmers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching farmers', error: err.message });
    }
});

// ✅ Get a specific farmer by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const farmer = await Farmer.findById(id);

        if (!farmer) {
            return res.status(404).json({ message: 'Farmer not found' });
        }

        res.status(200).json(farmer);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching farmer details', error: error.message });
    }
});

// ✅ Update farmer details
router.put('/:id', async (req, res) => {
    try {
        const farmer = await Farmer.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
            runValidators: true 
        });

        if (!farmer) {
            return res.status(404).json({ message: 'Farmer not found' });
        }

        res.status(200).json({ message: 'Farmer updated successfully!', farmer });

    } catch (err) {
        res.status(400).json({ message: 'Error updating farmer', error: err.message });
    }
});

// ✅ Delete farmer
router.delete('/:id', async (req, res) => {
    try {
        const farmer = await Farmer.findByIdAndDelete(req.params.id);

        if (!farmer) {
            return res.status(404).json({ message: 'Farmer not found' });
        }

        res.status(200).json({ message: 'Farmer deleted successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Error deleting farmer', error: err.message });
    }
});

module.exports = router;
