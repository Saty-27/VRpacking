const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const { protect } = require('../middleware/auth');

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, companyName, productInterested, message, file } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Name and email are required' });
    const inquiry = await Inquiry.create({ name, email, phone, companyName, productInterested, message, file });
    res.status(201).json({ message: 'Inquiry submitted successfully', inquiry });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/admin', protect, async (req, res) => {
  try {
    const { status, product } = req.query;
    const query = {};
    if (status) query.status = status;
    if (product) query.productInterested = { $regex: product, $options: 'i' };
    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/admin/:id', protect, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/admin/:id', protect, async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Inquiry deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/admin/export', protect, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    const header = 'Name,Company,Email,Phone,Product,Message,Status,Date';
    const rows = inquiries.map(i => `"${i.name}","${i.companyName}","${i.email}","${i.phone}","${i.productInterested}","${i.message}","${i.status}","${i.createdAt}"`);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=inquiries.csv');
    res.send([header, ...rows].join('\n'));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
