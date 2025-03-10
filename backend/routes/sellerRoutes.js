const express = require('express');
const Seller = require('../models/Seller');

const router = express.Router();

// Create a Seller
router.post('/', async (req, res) => {
    try {
        const seller = new Seller(req.body);
        await seller.save();
        res.status(201).json(seller);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all Sellers
router.get('/', async (req, res) => {
    try {
        const sellers = await Seller.find();
        res.status(200).json(sellers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single Seller by ID
router.get('/:id', async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id);
        if (!seller) return res.status(404).json({ message: 'Seller not found' });
        res.status(200).json(seller);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a Seller
router.put('/:id', async (req, res) => {
    try {
        const seller = await Seller.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(seller);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a Seller
router.delete('/:id', async (req, res) => {
    try {
        await Seller.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Seller deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
