const express = require('express');
const router = express.Router();
const Seller = require('../models/Seller');

router.post('/', async (req, res) => {
    try {
        const { name, location, product, contact, leaseOptions } = req.body;
        const newSeller = new Seller({ name, location, product, contact, leaseOptions });
        await newSeller.save();
        res.status(201).json({ message: 'Seller added successfully!', seller: newSeller });
    } catch (error) {
        res.status(500).json({ message: 'Error adding seller', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const sellers = await Seller.find();
        res.status(200).json(sellers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sellers', error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Seller.findByIdAndDelete(id);
        res.status(200).json({ message: 'Seller deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting seller', error });
    }
});

module.exports = router;
