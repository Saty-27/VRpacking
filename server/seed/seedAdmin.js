require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const AdminUser = require('../models/AdminUser');
const SiteSettings = require('../models/SiteSettings');
const connectDB = require('../config/db');

async function seedAdmin() {
  await connectDB();
  await AdminUser.deleteMany({});
  await AdminUser.create({ name: 'Admin', email: 'admin@vrpack.co.in', password: 'VRPack@2024', role: 'superadmin' });
  console.log('✅ Admin seeded');

  await SiteSettings.deleteMany({});
  await SiteSettings.create({
    companyName: 'VR Packaging Solutions',
    tagline: 'Manufacturer of VCI & Seaworthy Packaging Solution',
    phone: '+91 7384 11611',
    whatsapp: '917383411611',
    email: 'vijay@vrpack.co.in',
    address: '253/19-A, Opp. Columbia Machine Pvt Ltd, GIDC Industrial Estate, Makarpura, Vadodara - 390010, Gujarat',
    mapIframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.169!2d73.1883!3d22.2587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMakarpura+GIDC!5e0!3m2!1sen!2sin!4v1" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
    footerDescription: 'VR Packaging Solutions is a trusted provider of custom-made VCI products and seaworthy packaging solutions in Vadodara, Gujarat. We help industries protect products from corrosion, moisture, and transit damage.',
    copyrightText: '© 2026 VR Packaging Solutions. All Rights Reserved.',
    socialLinks: { facebook: '#', linkedin: '#', instagram: '#', twitter: '#', youtube: '#' },
  });
  console.log('✅ Site Settings seeded');
  process.exit(0);
}
seedAdmin().catch(e => { console.error(e); process.exit(1); });
