const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const { protect } = require('../middleware/auth');

// GET /api/gallery (public)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = { isActive: true };
    if (category && category !== 'All') query.category = category;
    const images = await Gallery.find(query).sort({ order: 1, createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/gallery/:slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const image = await Gallery.findOne({ slug: req.params.slug, isActive: true });
    if (!image) return res.status(404).json({ message: 'Gallery item not found' });
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// GET /api/gallery/admin/all (admin)
router.get('/admin/all', protect, async (req, res) => {
  try {
    const images = await Gallery.find().sort({ order: 1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/admin/gallery (admin)
router.post('/admin', protect, async (req, res) => {
  try {
    const image = await Gallery.create(req.body);
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/admin/gallery/:id (admin)
router.put('/admin/:id', protect, async (req, res) => {
  try {
    const image = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!image) return res.status(404).json({ message: 'Image not found' });
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE /api/admin/gallery/:id (admin)
router.delete('/admin/:id', protect, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
