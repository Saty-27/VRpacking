const express = require('express');
const router = express.Router();
const Page = require('../models/Page');
const { protect } = require('../middleware/auth');
const defaultPages = require('../config/defaultPages');

const defaultPageSlugs = defaultPages.map(page => page.slug);

async function ensureDefaultPages() {
  const existingCount = await Page.countDocuments({ slug: { $in: defaultPageSlugs } });
  if (existingCount >= defaultPages.length) return;

  await Page.bulkWrite(
    defaultPages.map(page => ({
      updateOne: {
        filter: { slug: page.slug },
        update: { $setOnInsert: page },
        upsert: true,
      },
    })),
    { ordered: false }
  );
}

// GET /api/pages
router.get('/', async (req, res) => {
  try {
    await ensureDefaultPages();
    const pages = await Page.find().sort({ pageName: 1 });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/pages/:slug
router.get('/:slug', async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    if (!page) return res.status(404).json({ message: 'Page not found' });
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/pages (admin)
router.post('/', protect, async (req, res) => {
  try {
    const page = await Page.create(req.body);
    res.status(201).json(page);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/pages/:id (admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const page = await Page.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!page) return res.status(404).json({ message: 'Page not found' });
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE /api/pages/:id (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    await Page.findByIdAndDelete(req.params.id);
    res.json({ message: 'Page deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
