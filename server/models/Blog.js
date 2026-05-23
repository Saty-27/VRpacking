const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  featuredImage: { type: String, default: '' },
  category: { type: String, default: 'General' },
  tags: [{ type: String }],
  excerpt: { type: String, default: '' },
  content: { type: String, default: '' },
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  author: { type: String, default: 'VR Packaging Solutions' },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

blogSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
