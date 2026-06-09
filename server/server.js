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
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '30d',
  immutable: true,
}));

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
    const baseUrl = 'https://vrpack.co.in';
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Static pages
    const mainPages = [
      { loc: '', priority: '1.0' },
      { loc: '/about-us', priority: '0.8' },
      { loc: '/contact-us', priority: '0.8' },
      { loc: '/products', priority: '0.8' },
      { loc: '/services', priority: '0.8' },
      { loc: '/gallery', priority: '0.8' },
      { loc: '/video-gallery', priority: '0.8' },
      { loc: '/blog', priority: '0.8' },
      { loc: '/sitemap', priority: '0.6' }
    ];
    mainPages.forEach(p => {
      xml += `  <url>\n    <loc>${baseUrl}${p.loc}</loc>\n    <lastmod>2026-06-08</lastmod>\n    <priority>${p.priority}</priority>\n  </url>\n`;
    });

    // Priority SEO Services
    const seoServices = [
      '/seaworthy-packing-in-vadodara',
      '/vci-packaging-in-vadodara',
      '/vci-packaging-manufacturer-in-vadodara',
      '/export-packaging-in-vadodara',
      '/industrial-packaging-solutions-in-vadodara',
      '/aluminium-barrier-foil-packing-in-vadodara',
      '/thermo-shrink-packing-in-vadodara',
      '/odc-cargo-packing-in-vadodara',
      '/desiccant-supplier-in-vadodara',
      '/humidity-indicator-card-supplier-in-vadodara',
      '/silpaulin-tarpaulin-cover-supplier-in-vadodara',
      '/ld-hm-liner-manufacturer-in-vadodara',
      '/packaging-consultancy-in-vadodara'
    ];
    seoServices.forEach(s => {
      xml += `  <url>\n    <loc>${baseUrl}${s}</loc>\n    <lastmod>2026-06-08</lastmod>\n    <priority>0.9</priority>\n  </url>\n`;
    });

    // Dynamic Products
    const products = await Product.find({ isPublished: { $ne: false } }).select('slug updatedAt').lean();
    products.forEach(p => {
      // Standard flat route
      xml += `  <url>\n    <loc>${baseUrl}/${p.slug}</loc>\n    <lastmod>2026-06-08</lastmod>\n    <priority>0.7</priority>\n  </url>\n`;
      // Localized SEO route
      xml += `  <url>\n    <loc>${baseUrl}/${p.slug}-in-vadodara</loc>\n    <lastmod>2026-06-08</lastmod>\n    <priority>0.7</priority>\n  </url>\n`;
    });

    // Dynamic Blogs
    const blogs = await Blog.find({ isPublished: { $ne: false } });
    blogs.forEach(b => {
      xml += `  <url>\n    <loc>${baseUrl}/blog/${b.slug}</loc>\n    <lastmod>2026-06-08</lastmod>\n    <priority>0.6</priority>\n  </url>\n`;
    });

    xml += '</urlset>';
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    res.status(500).json({ message: 'Error generating sitemap', error: error.message });
  }
});

// Robots.txt
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nAllow: /\nSitemap: https://vrpack.co.in/sitemap.xml');
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
