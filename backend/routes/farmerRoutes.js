const express = require('express');
const Farmer = require('../models/Farmer');

const router = express.Router();

// Create a Farmer
router.post('/', async (req, res) => {
    try {
        const farmer = new Farmer(req.body);
        await farmer.save();
        res.status(201).json(farmer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all Farmers
router.get('/', async (req, res) => {
    try {
        const farmers = await Farmer.find();
        res.status(200).json(farmers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single Farmer by ID
router.get('/:id', async (req, res) => {
    try {
        const farmer = await Farmer.findById(req.params.id);
        if (!farmer) return res.status(404).json({ message: 'Farmer not found' });
        res.status(200).json(farmer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a Farmer
router.put('/:id', async (req, res) => {
    try {
        const farmer = await Farmer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(farmer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a Farmer
router.delete('/:id', async (req, res) => {
    try {
        await Farmer.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Farmer deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
