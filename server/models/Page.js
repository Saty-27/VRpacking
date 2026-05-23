const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  pageName: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  keywords: { type: String, default: '' },
  ogImage: { type: String, default: '' },
  canonicalUrl: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Page', pageSchema);
