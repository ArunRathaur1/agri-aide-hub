const express = require('express');
const router = express.Router();
const Seller = require('../models/Seller');

// Add a new seller
router.post('/', async (req, res) => {
    try {
        const { name, location, contact, products } = req.body;
        const newSeller = new Seller({ name, location, contact, products });
        await newSeller.save();
        res.status(201).json({ message: 'Seller added successfully!', seller: newSeller });
    } catch (error) {
        res.status(500).json({ message: 'Error adding seller', error });
    }
});

// Get all sellers
router.get('/', async (req, res) => {
    try {
        const sellers = await Seller.find();
        res.status(200).json(sellers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sellers', error });
    }
});

// Get a single seller by ID
router.get('/:id', async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id);
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        res.status(200).json(seller);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching seller details', error });
    }
});

// Update seller details
router.put('/:id', async (req, res) => {
    try {
        const updatedSeller = await Seller.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Seller updated successfully', seller: updatedSeller });
    } catch (error) {
        res.status(500).json({ message: 'Error updating seller', error });
    }
});

// Add a new product to an existing seller
router.patch('/:id/products', async (req, res) => {
    try {
        const { name, image, leaseOptions } = req.body;
        const seller = await Seller.findById(req.params.id);
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        seller.products.push({ name, image, leaseOptions });
        await seller.save();

        res.status(200).json({ message: 'Product added successfully!', seller });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
});

// Delete a seller
router.delete('/:id', async (req, res) => {
    try {
        await Seller.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Seller deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting seller', error });
    }
});

module.exports = router;
