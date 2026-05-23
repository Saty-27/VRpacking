const express = require('express');
const router = express.Router();
const ProductCategory = require('../models/ProductCategory');
const { protect } = require('../middleware/auth');

// GET /api/categories (public)
router.get('/', async (req, res) => {
  try {
    const categories = await ProductCategory.find({ isActive: true }).sort({ order: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/admin/categories (admin)
router.post('/admin', protect, async (req, res) => {
  try {
    const category = await ProductCategory.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/admin/categories/:id (admin)
router.put('/admin/:id', protect, async (req, res) => {
  try {
    const category = await ProductCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE /api/admin/categories/:id (admin)
router.delete('/admin/:id', protect, async (req, res) => {
  try {
    await ProductCategory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
