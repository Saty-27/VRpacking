const express = require('express');
const router = express.Router();
const Section = require('../models/Section');
const { protect } = require('../middleware/auth');

// GET /api/sections/:pageName
router.get('/:pageName', async (req, res) => {
  try {
    const sections = await Section.find({
      pageName: req.params.pageName,
      isActive: true,
    }).sort({ order: 1 });
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/sections/admin/all/:pageName (admin - includes inactive)
router.get('/admin/all/:pageName', protect, async (req, res) => {
  try {
    const sections = await Section.find({
      pageName: req.params.pageName,
    }).sort({ order: 1 });
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/sections (admin)
router.post('/', protect, async (req, res) => {
  try {
    const section = await Section.create(req.body);
    res.status(201).json(section);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/sections/:id (admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!section) return res.status(404).json({ message: 'Section not found' });
    res.json(section);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE /api/sections/:id (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    await Section.findByIdAndDelete(req.params.id);
    res.json({ message: 'Section deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/sections/reorder (admin)
router.put('/reorder/bulk', protect, async (req, res) => {
  try {
    const { sections } = req.body;
    const updates = sections.map((s) =>
      Section.findByIdAndUpdate(s.id, { order: s.order })
    );
    await Promise.all(updates);
    res.json({ message: 'Sections reordered' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
