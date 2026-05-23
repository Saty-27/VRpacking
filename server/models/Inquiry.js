const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: { type: String, default: '' },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  productInterested: { type: String, default: '' },
  message: { type: String, default: '' },
  file: { type: String, default: '' },
  status: { type: String, enum: ['unread', 'read'], default: 'unread' },
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
