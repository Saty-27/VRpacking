const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  pageName: { type: String, required: true, index: true },
  sectionKey: { type: String, required: true },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  description: { type: String, default: '' },
  images: [{ type: String }],
  backgroundImage: { type: String, default: '' },
  icon: { type: String, default: '' },
  buttons: [{
    text: { type: String },
    link: { type: String },
    style: { type: String, default: 'primary' },
  }],
  contentBlocks: [{
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    image: { type: String },
    icon: { type: String },
    link: { type: String },
  }],
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

sectionSchema.index({ pageName: 1, sectionKey: 1 }, { unique: true });

module.exports = mongoose.model('Section', sectionSchema);
