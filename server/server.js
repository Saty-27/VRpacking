require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const pageRoutes = require('./routes/pages');
const sectionRoutes = require('./routes/sections');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const serviceRoutes = require('./routes/services');
const blogRoutes = require('./routes/blogs');
const galleryRoutes = require('./routes/gallery');
const inquiryRoutes = require('./routes/inquiries');
const faqRoutes = require('./routes/faqs');
const testimonialRoutes = require('./routes/testimonials');
const settingsRoutes = require('./routes/settings');
const uploadRoutes = require('./routes/upload');

const Product = require('./models/Product');
const Blog = require('./models/Blog');
const Service = require('./models/Service');
const Page = require('./models/Page');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/admin', authRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);

// Sitemap.xml
app.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = 'https://www.vrpack.co.in';
    const products = await Product.find({ isPublished: true }).select('slug updatedAt');
    const blogs = await Blog.find({ isPublished: true }).select('slug updatedAt');
    const services = await Service.find({ isPublished: true }).select('slug updatedAt');

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    const pages = ['', '/about-us', '/products', '/services', '/gallery', '/blog', '/contact-us', '/privacy-policy', '/terms-and-conditions'];
    pages.forEach(p => {
      xml += `  <url><loc>${baseUrl}${p}</loc><changefreq>weekly</changefreq><priority>${p === '' ? '1.0' : '0.8'}</priority></url>\n`;
    });
    products.forEach(p => {
      xml += `  <url><loc>${baseUrl}/products/${p.slug}</loc><lastmod>${p.updatedAt.toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`;
    });
    blogs.forEach(b => {
      xml += `  <url><loc>${baseUrl}/blog/${b.slug}</loc><lastmod>${b.updatedAt.toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>\n`;
    });
    services.forEach(s => {
      xml += `  <url><loc>${baseUrl}/services/${s.slug}</loc><lastmod>${s.updatedAt.toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`;
    });
    xml += '</urlset>';

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    res.status(500).json({ message: 'Error generating sitemap' });
  }
});

// Robots.txt
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nAllow: /\nSitemap: https://www.vrpack.co.in/sitemap.xml');
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 VR Packaging Server running on port ${PORT}`);
});
