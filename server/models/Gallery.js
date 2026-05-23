const mongoose = require('mongoose');
const slugify = require('slugify');

const gallerySchema = new mongoose.Schema({
  title: { type: String, default: '' },
  slug: { type: String, unique: true },
  image: { type: String, required: true },
  category: { type: String, default: 'General' },
  caption: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  keywords: { type: String, default: '' },
}, { timestamps: true });

gallerySchema.pre('save', function (next) {
  if (this.title && (this.isModified('title') || !this.slug)) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (!this.metaTitle && this.title) {
    this.metaTitle = `${this.title} - VR Packaging Solutions Gallery`;
  }
  if (!this.metaDescription && this.caption) {
    this.metaDescription = this.caption;
  }
  if (!this.keywords && this.title) {
    this.keywords = `${this.title}, ${this.category}, industrial packaging, vr packaging`;
  }
  next();
});

module.exports = mongoose.model('Gallery', gallerySchema);

