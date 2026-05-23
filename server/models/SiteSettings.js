const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  logo: { type: String, default: '' },
  favicon: { type: String, default: '' },
  companyName: { type: String, default: 'VR Packaging Solutions' },
  tagline: { type: String, default: 'Manufacturer of VCI & Seaworthy Packaging Solution' },
  phone: { type: String, default: '+91 7384 11611' },
  whatsapp: { type: String, default: '+917384111611' },
  email: { type: String, default: 'vijay@vrpack.co.in' },
  address: { type: String, default: '' },
  mapIframe: { type: String, default: '' },
  socialLinks: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    youtube: { type: String, default: '' },
  },
  footerDescription: { type: String, default: '' },
  copyrightText: { type: String, default: '' },
  headerLinks: [{
    label: { type: String },
    url: { type: String },
    children: [{
      label: { type: String },
      url: { type: String },
    }],
  }],
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
