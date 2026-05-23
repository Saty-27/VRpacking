const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory' },
  shortDescription: { type: String, default: '' },
  longDescription: { type: String, default: '' },
  images: [{ type: String }],
  features: [{ type: String }],
  applications: [{ type: String }],
  technicalSpecs: [{
    label: { type: String },
    value: { type: String },
  }],
  benefits: [{ type: String }],
  relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  keywords: { type: String, default: '' },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

productSchema.pre('save', function (next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
