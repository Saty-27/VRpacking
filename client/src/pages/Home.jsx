import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaShieldAlt, FaIndustry, FaBoxOpen,
  FaArrowRight, FaBox, FaCubes,
  FaBoxes, FaCar, FaMicrochip, FaWarehouse,
  FaWrench, FaTruck, FaPhone,
  FaLayerGroup, FaThermometerHalf, FaTint, FaEnvelope,
  FaPlay, FaMapMarkerAlt, FaGlobe
} from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { FaShip, FaCogs } from 'react-icons/fa';
import SEOHead from '../components/common/SEOHead';
import InquiryModal from '../components/common/InquiryModal';
import api, { API_URL } from '../utils/api';
import './Home.css';

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

export default function Home() {
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [videos, setVideos] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [settings, setSettings] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  
  const [sections, setSections] = useState([]);
  const [loadingSections, setLoadingSections] = useState(true);

  useEffect(() => {
    let mounted = true;
    const setIfMounted = (setter, value) => {
      if (mounted) setter(value);
    };

    const requests = [
      api.get('/products?limit=8')
        .then(r => setIfMounted(setProducts, r.data?.products || []))
        .catch(() => {}),
      api.get('/services')
        .then(r => setIfMounted(setServices, Array.isArray(r.data) ? r.data : []))
        .catch(() => {}),
      api.get('/gallery')
        .then(r => {
          const allItems = Array.isArray(r.data) ? r.data : [];
          setIfMounted(setGallery, allItems.filter(item => item.mediaType !== 'video').slice(0, 8));
          setIfMounted(setVideos, allItems.filter(item => item.mediaType === 'video').slice(0, 4));
        })
        .catch(() => {}),
      api.get('/blogs?limit=3')
        .then(r => setIfMounted(setBlogs, r.data?.blogs || []))
        .catch(() => {}),
      api.get('/settings')
        .then(r => setIfMounted(setSettings, r.data || {}))
        .catch(() => {}),
      api.get('/sections/home')
        .then(r => setIfMounted(setSections, Array.isArray(r.data) ? r.data : []))
        .catch(() => {})
    ];

    Promise.allSettled(requests).finally(() => {
      if (mounted) setLoadingSections(false);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const getSection = (key) => sections.find(s => s.sectionKey === key) || {};
  const cmsManagedHomeSections = new Set([
    'hero',
    'about-preview',
    'specialization',
    'why-choose-us',
    'product-categories',
    'industries',
    'process',
    'gallery-preview',
    'blog-preview',
    'final-cta',
  ]);
  const hasSection = (key) => {
    if (loadingSections || sections.length === 0 || !cmsManagedHomeSections.has(key)) return true;
    return sections.some(s => s.sectionKey === key);
  };
  const blocksOrFallback = (section, fallback) => (
    Array.isArray(section.contentBlocks) && section.contentBlocks.length > 0 ? section.contentBlocks : fallback
  );

  const handleInquiry = (productName = '') => {
    setSelectedProduct(productName);
    setModalOpen(true);
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://vrpack.co.in/#organization",
        name: "VR Packaging Solutions",
        url: "https://vrpack.co.in/",
        logo: "https://vrpack.co.in/logo-512x512.png",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+917383411611",
          contactType: "sales",
          areaServed: "IN",
          availableLanguage: ["en", "hi", "gu"]
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://vrpack.co.in/#localbusiness",
        name: "VR Packaging Solutions",
        image: "https://vrpack.co.in/logo-512x512.png",
        logo: "https://vrpack.co.in/logo-512x512.png",
        description: "Manufacturer of VCI, seaworthy, shrink wrapping, industrial, and export packaging solutions in Vadodara, Gujarat.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "253/19-A, Opp. Columbia Machine Pvt Ltd, GIDC Industrial Estate, Makarpura",
          addressLocality: "Vadodara",
          addressRegion: "Gujarat",
          postalCode: "390010",
          addressCountry: "IN"
        },
        telephone: "+917383411611",
        email: "vijay@vrpack.co.in",
        url: "https://vrpack.co.in/",
        priceRange: "$$"
      },
      {
        "@type": "WebSite",
        "@id": "https://vrpack.co.in/#website",
        name: "VR Packaging Solutions",
        url: "https://vrpack.co.in/",
        publisher: { "@id": "https://vrpack.co.in/#organization" }
      }
    ]
  };

  const specializations = [
    { icon: <FaShieldAlt />, title: 'VCI film & Aluminium Barrier Foil Rolls and Covers.', desc: 'Rolls and covers for corrosion and moisture protection during storage and transit.' },
    { icon: <FaTint />, title: 'Desiccants and Humidity Indicator.', desc: 'Moisture control products for safe storage and export packing.' },
    { icon: <FaLayerGroup />, title: 'Tarpaulin & Silpaulin Rolls and Covers.', desc: 'Heavy-duty rolls and covers for industrial and outdoor protection.' },
    { icon: <FaShip />, title: 'Seaworthy Packing', desc: 'ISPM-15 compliant wooden packaging for international shipments.' },
    { icon: <FaTruck />, title: 'ODC and Cargo Project Packing', desc: 'Over-dimensional cargo and project cargo packing support.' },
    { icon: <FaWrench />, title: 'Packing Consultancy', desc: 'Guidance on suitable packaging methods for specific industrial needs.' },
  ];

  const whyUs = [
    { title: '15+ Years of Experience', desc: 'Industry experience in protective and industrial packaging solutions.', icon: <FaCubes /> },
    { title: 'Custom-Made Packaging', desc: 'Packaging solutions designed according to product size, handling, and transportation needs.', icon: <FaCogs /> },
    { title: 'Corrosion & Moisture Protection', desc: 'Solutions like VCI film, barrier foil, desiccants, and humidity indicators for safer storage and transit.', icon: <FaShieldAlt /> },
    { title: 'Export & Seaworthy Packing Support', desc: 'Packaging options suitable for long-distance movement and export handling requirements.', icon: <FaShip /> },
    { title: 'Industrial Product Range', desc: 'Multiple packaging materials including films, rolls, bags, covers, liners, and preservation solutions.', icon: <FaBoxes /> },
    { title: 'Inquiry-Based Support', desc: 'Customers can send requirements and get product or packaging guidance from our team.', icon: <FaEnvelope /> },
  ];

  const industries = [
    { title: 'Engineering Goods', icon: <FaWrench /> },
    { title: 'Machinery & Equipment', icon: <FaCogs /> },
    { title: 'Electronics & Electricals', icon: <FaMicrochip /> },
    { title: 'Automotive Components', icon: <FaCar /> },
    { title: 'Export Cargo', icon: <FaShip /> },
    { title: 'Industrial Storage', icon: <FaWarehouse /> },
    { title: 'Project Cargo', icon: <FaTruck /> },
    { title: 'Manufacturing Units', icon: <FaIndustry /> },
  ];

  const steps = [
    { num: 1, title: 'Requirement Understanding', desc: 'We understand your product type, size, and packaging or transportation needs.' },
    { num: 2, title: 'Product / Packaging Suggestion', desc: 'We suggest suitable packaging materials or solutions based on your requirements.' },
    { num: 3, title: 'Material Selection', desc: 'Appropriate materials are selected — VCI film, barrier foil, wood, shrink, etc.' },
    { num: 4, title: 'Packing / Supply Support', desc: 'We complete the packing or supply the materials as per the agreed specification.' },
  ];

  const fallbackProducts = [
    { _id: 'fallback-vci-film', name: 'VCI Film Roll', slug: 'vci-film-roll', category: { name: 'VCI Products' } },
    { _id: 'fallback-barrier-foil', name: 'Aluminium Barrier Foil Rolls', slug: 'aluminium-barrier-foil-rolls', category: { name: 'Barrier Foil' } },
    { _id: 'fallback-silpaulin', name: 'Silpaulin Cover', slug: 'silpaulin-cover', category: { name: 'Protective Covers' } },
    { _id: 'fallback-liner-bags', name: 'Heavy Duty Liner Bags', slug: 'heavy-duty-liner-bags', category: { name: 'Industrial Bags' } },
    { _id: 'fallback-humidity', name: 'Humidity Indicator', slug: 'humidity-indicator-card', category: { name: 'Moisture Control' } },
    { _id: 'fallback-desiccants', name: 'Desiccants', slug: 'desiccant-bags', category: { name: 'Moisture Control' } },
    { _id: 'fallback-shrink', name: 'LDPE Shrink Film', slug: 'ldpe-shrink-film', category: { name: 'Shrink Packing' } },
    { _id: 'fallback-hdpe', name: 'HDPE Roll', slug: 'hdpe-roll-supplier', category: { name: 'Industrial Rolls' } },
  ];

  const fallbackServices = [
    { _id: 'fallback-seaworthy', name: 'Seaworthy Packing', shortDescription: 'Export-ready packing for machinery, equipment, and industrial cargo.', icon: <FaShip /> },
    { _id: 'fallback-shrink-wrapping', name: 'Shrink Wrapping', shortDescription: 'Dust, moisture, and transit protection with LDPE and thermo shrink films.', icon: <FaThermometerHalf /> },
    { _id: 'fallback-vci-packaging', name: 'VCI Packaging', shortDescription: 'Corrosion protection for metal components during storage and shipping.', icon: <FaShieldAlt /> },
    { _id: 'fallback-odc', name: 'ODC & Cargo Project Packing', shortDescription: 'Packing support for heavy, large, and over-dimensional industrial cargo.', icon: <FaTruck /> },
    { _id: 'fallback-consultancy', name: 'Packing Consultancy', shortDescription: 'Practical guidance for custom packaging material selection and packing method.', icon: <FaWrench /> },
    { _id: 'fallback-barrier', name: 'Barrier Foil Packing', shortDescription: 'Moisture barrier preservation using aluminium barrier foil and desiccants.', icon: <FaLayerGroup /> },
  ];

  const fallbackVideos = [
    { _id: 'fallback-video-1', title: 'VCI Packaging Process', category: 'VCI Products' },
    { _id: 'fallback-video-2', title: 'Seaworthy Packing Work', category: 'Seaworthy Packing' },
    { _id: 'fallback-video-3', title: 'Shrink Wrapping Application', category: 'Shrink Packing' },
    { _id: 'fallback-video-4', title: 'Industrial Packing Projects', category: 'Industrial Packaging' },
  ];

  const fallbackBlogs = [
    { _id: 'fallback-blog-1', title: 'How VCI Packaging Helps Prevent Rust', slug: 'vci-packaging-for-rust-prevention', category: 'VCI Packaging', excerpt: 'A practical guide to corrosion protection for metal products during storage and export movement.' },
    { _id: 'fallback-blog-2', title: 'Seaworthy Packing for Export Cargo', slug: 'seaworthy-packing-in-vadodara-complete-guide', category: 'Seaworthy Packing', excerpt: 'Key points manufacturers should consider before shipping machinery and industrial cargo overseas.' },
    { _id: 'fallback-blog-3', title: 'Moisture Control in Industrial Packaging', slug: 'why-desiccants-and-humidity-indicators-are-important', category: 'Moisture Protection', excerpt: 'Why desiccants, humidity indicators, and barrier materials matter for long-distance transit safety.' },
  ];

  const hero = getSection('hero');
  const aboutPreview = getSection('about-preview');
  const specializationSec = getSection('specialization');
  const whyChooseUsSec = getSection('why-choose-us');
  const productCategoriesSec = getSection('product-categories');
  const servicesPreviewSec = getSection('services-preview');
  const industriesSec = getSection('industries');
  const processSec = getSection('process');
  const galleryPreviewSec = getSection('gallery-preview');
  const videoGalleryPreviewSec = getSection('video-gallery-preview');
  const blogPreviewSec = getSection('blog-preview');
  const contactPreviewSec = getSection('contact-preview');
  const finalCtaSec = getSection('final-cta');
  const featuredProducts = products.length > 0 ? products.slice(0, 8) : fallbackProducts;
  const featuredServices = services.length > 0 ? services.slice(0, 6) : fallbackServices;
  const featuredVideos = videos.length > 0 ? videos.slice(0, 4) : fallbackVideos;
  const featuredBlogs = blogs.length > 0 ? blogs.slice(0, 3) : fallbackBlogs;

  return (
    <div style={{ background: 'var(--white)', color: 'var(--navy)' }}>
      <SEOHead
        title="VR Packaging Solutions | VCI & Seaworthy Packaging Manufacturer in Vadodara"
        description="VR Packaging Solutions provides industrial packaging materials and custom-made packaging solutions for corrosion protection, moisture control, seaworthy packing, VCI packaging, shrink wrapping, and export packaging in Vadodara, Gujarat."
        keywords="VCI packaging Vadodara, seaworthy packing Gujarat, export packaging, industrial packaging, barrier foil, silpaulin cover, humidity indicator"
        canonical="https://vrpack.co.in/"
        schema={schema}
      />

      {/* ── 1. HERO ── */}
      {hasSection('hero') && (
        <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <img src="/hero_bg.jpg" alt="Industrial Packaging" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(17,24,39,0.92) 0%, rgba(17,24,39,0.5) 100%)' }} />
          </div>
          <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ maxWidth: 780 }}>
              <motion.div variants={fadeInUp} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ width: 40, height: 2, background: 'var(--orange)' }} />
                <span style={{ color: 'var(--orange)', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', fontSize: '0.85rem' }}>
                  Vadodara, Gujarat · India
                </span>
              </motion.div>
              <motion.h1 variants={fadeInUp} style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)', color: 'var(--white)', fontWeight: 800, lineHeight: 1.15, marginBottom: 20 }}>
                {hero.title ? (
                  hero.title.includes('VCI') ? (
                    <>
                      Manufacturer of VCI &<br />
                      <span style={{ color: 'var(--orange)' }}>Seaworthy Packaging</span> Solutions
                    </>
                  ) : hero.title
                ) : (
                  <>
                    Manufacturer of VCI &<br />
                    <span style={{ color: 'var(--orange)' }}>Seaworthy Packaging</span> Solutions
                  </>
                )}
              </motion.h1>
              <motion.p variants={fadeInUp} style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.82)', marginBottom: 40, maxWidth: 580, lineHeight: 1.7 }}>
                {hero.description || 'Protecting industrial goods from corrosion, moisture, dust, and transit damage with reliable packaging solutions.'}
              </motion.p>
              <motion.div variants={fadeInUp} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Link to="/products" className="btn btn-primary btn-lg">
                  Explore Products <FaArrowRight />
                </Link>
                <button onClick={() => handleInquiry()} className="btn btn-outline btn-lg">
                  Get Quote
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── 2. ABOUT PREVIEW ── */}
      {hasSection('about-preview') && (
        <section className="section">
          <div className="container">
            <div className="grid grid-2" style={{ gap: 60, alignItems: 'center' }}>
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <span style={{ color: 'var(--orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>Who We Are</span>
                <h2 style={{ marginTop: 10, marginBottom: 20 }}>{aboutPreview.title || 'VR Packaging Solutions'}</h2>
                <p style={{ color: 'var(--grey)', lineHeight: 1.85, marginBottom: 16 }}>
                  {aboutPreview.description || 'VR Packaging Solutions provides custom-made packaging solutions for industrial, export, and seaworthy packing requirements. With 15+ years of experience, we focus on corrosion protection, moisture control, safe handling, and reliable packaging for different industrial applications.'}
                </p>
                <Link to="/about-us" className="btn btn-primary">
                  {aboutPreview.buttons?.[0]?.text || 'Know More'} <FaArrowRight />
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {[
                    { icon: <FaShieldAlt />, label: 'VCI Protection' },
                    { icon: <FaShip />, label: 'Seaworthy Packing' },
                    { icon: <FaLayerGroup />, label: 'Barrier Foil Rolls' },
                    { icon: <FaTint />, label: 'Humidity Control' },
                    { icon: <FaThermometerHalf />, label: 'Shrink Wrapping' },
                    { icon: <FaBox />, label: 'Protective Covers' },
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                      style={{ background: 'var(--grey-light)', borderRadius: 'var(--radius-lg)', padding: '18px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ fontSize: '1.3rem', color: 'var(--orange)', flexShrink: 0 }}>{item.icon}</div>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--navy)' }}>{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ── 3. SPECIALIZATION ── */}
      {hasSection('specialization') && (
        <section className="section" style={{ background: 'var(--navy)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 50 }}>
              <span style={{ color: 'var(--orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>What We Offer</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10, color: 'var(--white)' }}>{specializationSec.title || 'Our Specialization'}</h2>
              <div style={{ width: 60, height: 4, background: 'var(--orange)', margin: '16px auto 0', borderRadius: 2 }} />
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-4" style={{ gap: 20 }}>
              {blocksOrFallback(specializationSec, specializations).map((item, i) => (
                <motion.div key={i} variants={fadeInUp}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-lg)', padding: '28px 22px', transition: 'all 0.3s', cursor: 'default' }}
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(230,92,0,0.12)'; e.currentTarget.style.borderColor = 'rgba(230,92,0,0.4)'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>
                  <div style={{ fontSize: '1.8rem', color: 'var(--orange)', marginBottom: 14 }}>{specializations[i]?.icon || <FaBoxOpen />}</div>
                  <h4 style={{ color: 'var(--white)', fontSize: '1rem', marginBottom: 10, lineHeight: 1.4 }}>{item.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{item.description || specializations[i]?.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── 4. PRODUCTS ── */}
      {hasSection('product-categories') && (
        <section className="section" style={{ background: 'var(--grey-light)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
              <div>
                <span style={{ color: 'var(--orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>Our Catalog</span>
                <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10 }}>{productCategoriesSec.title || 'Our Packaging Products'}</h2>
              </div>
              <Link to="/products" className="btn btn-outline-dark" style={{ flexShrink: 0 }}>View All Products</Link>
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer} className="grid grid-4" style={{ gap: 20 }}>
              {featuredProducts.map((p) => (
                <motion.div key={p._id} variants={fadeInUp} className="card product-card"
                  style={{ background: 'var(--white)', boxShadow: 'var(--shadow-card)', transition: 'var(--transition)' }}
                  onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ height: 210, position: 'relative', overflow: 'hidden' }}>
                    {p.images && p.images[0]
                      ? <img src={p.images[0].startsWith('http') ? p.images[0] : `${API_URL}${p.images[0]}`} alt={p.name} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
                      : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--grey-light)' }}><FaBoxOpen size={44} color="var(--grey)" /></div>
                    }
                    {p.category?.name && (
                      <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--orange)', color: 'var(--white)', padding: '4px 12px', fontSize: '0.75rem', fontWeight: 600, borderRadius: 'var(--radius-full)' }}>
                        {p.category.name}
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '18px 18px 20px' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: 14, lineHeight: 1.4 }}>{p.name}</h3>
                    <div className="product-actions">
                      <button onClick={() => handleInquiry(p.name)} className="btn btn-primary btn-sm">Enquire</button>
                      <Link to={`/${p.slug}`} className="btn btn-outline-dark btn-sm" style={{ textAlign: 'center' }}>Details</Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── 5. SERVICES ── */}
      {hasSection('services-preview') && (
        <section className="section">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, gap: 20, flexWrap: 'wrap' }}>
              <div>
                <span style={{ color: 'var(--orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>What We Do</span>
                <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10 }}>{servicesPreviewSec.title || 'Packaging Services'}</h2>
                <p style={{ color: 'var(--grey)', marginTop: 10, maxWidth: 620 }}>{servicesPreviewSec.subtitle || 'VCI, seaworthy, shrink wrapping, and export packaging support for industrial goods.'}</p>
              </div>
              <Link to="/services" className="btn btn-outline-dark" style={{ flexShrink: 0 }}>View All Services</Link>
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-3" style={{ gap: 24 }}>
              {featuredServices.map((service, i) => (
                <motion.div key={service._id || service.name} variants={fadeInUp} className="card">
                  <div className="card-icon" style={{ color: 'var(--orange)' }}>
                    {fallbackServices[i]?.icon || <FaCogs />}
                  </div>
                  <h4 style={{ marginBottom: 10 }}>{service.name}</h4>
                  <p style={{ color: 'var(--grey)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: 18 }}>
                    {service.shortDescription || 'Custom packaging support for safe handling, storage, and transport.'}
                  </p>
                  <Link to="/services" className="blog-link">Learn More <FaArrowRight style={{ fontSize: '0.8rem' }} /></Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── 6. WHY CHOOSE US ── */}
      {hasSection('why-choose-us') && (
        <section className="section">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 50 }}>
              <span style={{ color: 'var(--orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>Our Strengths</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10 }}>{whyChooseUsSec.title || 'Why Choose VR Packaging Solutions?'}</h2>
              <div style={{ width: 60, height: 4, background: 'var(--orange)', margin: '16px auto 0', borderRadius: 2 }} />
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-3" style={{ gap: 24 }}>
              {blocksOrFallback(whyChooseUsSec, whyUs).map((item, i) => (
                <motion.div key={i} variants={fadeInUp}
                  style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '30px 26px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow-card)', transition: 'var(--transition)' }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <div style={{ width: 52, height: 52, background: 'rgba(230,92,0,0.08)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: 'var(--orange)', marginBottom: 16 }}>
                    {whyUs[i]?.icon || <FaBox />}
                  </div>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: 10, color: 'var(--navy)' }}>{item.title}</h4>
                  <p style={{ color: 'var(--grey)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>{item.description || whyUs[i]?.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── 6. INDUSTRIES / APPLICATIONS ── */}
      {hasSection('industries') && (
        <section className="section" style={{ background: 'var(--grey-light)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 50 }}>
              <span style={{ color: 'var(--orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>Applications</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10 }}>{industriesSec.title || 'Applications Across Industries'}</h2>
              <p style={{ color: 'var(--grey)', marginTop: 12, fontSize: '1rem' }}>Our packaging solutions are suitable for industries such as:</p>
              <div style={{ width: 60, height: 4, background: 'var(--orange)', margin: '16px auto 0', borderRadius: 2 }} />
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-4" style={{ gap: 20 }}>
              {blocksOrFallback(industriesSec, industries).map((ind, i) => (
                <motion.div key={i} variants={fadeInUp}
                  style={{ background: 'var(--white)', border: '1px solid rgba(0,0,0,0.06)', padding: '28px 20px', borderRadius: 'var(--radius-lg)', textAlign: 'center', transition: 'all 0.3s', cursor: 'default' }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <div style={{ fontSize: '2rem', color: 'var(--navy)', marginBottom: 14 }}>{industries[i]?.icon || <FaIndustry />}</div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--navy)' }}>{ind.title}</h4>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── 7. HOW WE WORK ── */}
      {hasSection('process') && (
        <section className="section" style={{ background: 'var(--navy)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 50 }}>
              <span style={{ color: 'var(--orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>Our Process</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10, color: 'var(--white)' }}>{processSec.title || 'How We Work'}</h2>
              <div style={{ width: 60, height: 4, background: 'var(--orange)', margin: '16px auto 0', borderRadius: 2 }} />
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-4" style={{ gap: 20 }}>
              {blocksOrFallback(processSec, steps).map((step, i) => (
                <motion.div key={i} variants={fadeInUp}
                  style={{ position: 'relative', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '36px 24px 28px', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ position: 'absolute', top: -18, left: 24, width: 36, height: 36, background: 'var(--orange)', color: 'var(--white)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem' }}>
                    {step.num || (i + 1)}
                  </div>
                  <h4 style={{ color: 'var(--white)', fontSize: '1rem', marginBottom: 12, lineHeight: 1.4 }}>{step.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>{step.description || steps[i]?.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── 8. GALLERY PREVIEW ── */}
      {hasSection('gallery-preview') && (
        <section className="section">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 50 }}>
              <span style={{ color: 'var(--orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>Portfolio</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10 }}>{galleryPreviewSec.title || 'Our Work Gallery'}</h2>
              <div style={{ width: 60, height: 4, background: 'var(--orange)', margin: '16px auto 0', borderRadius: 2 }} />
            </div>
            <div className="grid grid-4" style={{ gap: 16 }}>
              {gallery.length > 0
                ? gallery.map((img) => (
                  <div key={img._id} style={{ height: 240, borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--grey-light)' }}>
                    <img
                      src={img.image ? (img.image.startsWith('http') ? img.image : `${API_URL}${img.image}`) : '/uploads/product_placeholder.png'}
                      alt={img.title || 'Packaging work'}
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.06)'}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                ))
                : Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} style={{ height: 200, borderRadius: 'var(--radius-lg)', background: 'var(--grey-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FaIndustry size={36} color="var(--grey)" opacity={0.3} />
                  </div>
                ))
              }
            </div>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <Link to="/gallery" className="btn btn-outline-dark">{galleryPreviewSec.buttons?.[0]?.text || 'View Full Gallery'}</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── 9. VIDEO GALLERY PREVIEW ── */}
      {hasSection('video-gallery-preview') && (
        <section className="section" style={{ background: 'var(--grey-light)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, gap: 20, flexWrap: 'wrap' }}>
              <div>
                <span style={{ color: 'var(--orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>In Action</span>
                <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10 }}>{videoGalleryPreviewSec.title || 'Video Gallery'}</h2>
                <p style={{ color: 'var(--grey)', marginTop: 10, maxWidth: 620 }}>{videoGalleryPreviewSec.subtitle || 'See packaging, preservation, and industrial protection work in action.'}</p>
              </div>
              <Link to="/video-gallery" className="btn btn-outline-dark" style={{ flexShrink: 0 }}>View Videos</Link>
            </div>
            <div className="gallery-grid">
              {featuredVideos.map((video) => (
                <Link key={video._id || video.title} to={video.slug ? `/video-gallery/${video.slug}` : '/video-gallery'} className="gallery-thumb" style={{ display: 'block', position: 'relative' }}>
                  {video.image ? (
                    <img
                      src={video.image.startsWith('http') ? video.image : `${API_URL}${video.image}`}
                      alt={video.title || video.category || 'Packaging video'}
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="gallery-placeholder">
                      <FaPlay size={34} style={{ color: 'var(--orange-light)' }} />
                      <span>{video.category || 'Packaging Video'}</span>
                    </div>
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,24,39,0.78), rgba(17,24,39,0.08))', display: 'flex', alignItems: 'flex-end', padding: 18 }}>
                    <div>
                      <span className="badge badge-orange" style={{ marginBottom: 8 }}>{video.category || 'Video'}</span>
                      <h4 style={{ color: 'var(--white)', fontSize: '1rem', lineHeight: 1.35 }}>{video.title || 'Packaging Project Video'}</h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 10. BLOG PREVIEW ── */}
      {hasSection('blog-preview') && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>{blogPreviewSec.title || 'Latest From Our Blog'}</h2>
              <p className="subtitle">{blogPreviewSec.subtitle || 'Packaging insights for corrosion protection, moisture control, and export transit safety.'}</p>
            </div>
            <div className="grid grid-3" style={{ gap: 24 }}>
              {featuredBlogs.map((blog) => (
                <div key={blog._id || blog.slug} className="card blog-card">
                  <div className="blog-image">
                    {blog.featuredImage ? (
                      <img src={blog.featuredImage.startsWith('http') ? blog.featuredImage : `${API_URL}${blog.featuredImage}`} alt={blog.title} loading="lazy" decoding="async" />
                    ) : (
                      <FaGlobe size={34} color="var(--grey)" opacity={0.35} />
                    )}
                  </div>
                  <div className="blog-content">
                    <span className="badge badge-orange">{blog.category || 'Industrial Packaging'}</span>
                    <h4>{blog.title}</h4>
                    <p>{blog.excerpt || 'Read practical packaging guidance from VR Packaging Solutions.'}</p>
                    <Link to={blog.slug ? `/blog/${blog.slug}` : '/blog'} className="blog-link">
                      Read More <FaArrowRight style={{ fontSize: '0.8rem' }} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <Link to="/blog" className="btn btn-outline-dark">{blogPreviewSec.buttons?.[0]?.text || 'View More Blogs'}</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── 11. CONTACT PREVIEW ── */}
      {hasSection('contact-preview') && (
        <section className="section" style={{ background: 'var(--grey-light)' }}>
          <div className="container">
            <div className="grid grid-2" style={{ gap: 50, alignItems: 'center' }}>
              <div>
                <span style={{ color: 'var(--orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>Contact Us</span>
                <h2 style={{ marginTop: 10, marginBottom: 16 }}>{contactPreviewSec.title || 'Discuss Your Packaging Requirement'}</h2>
                <p style={{ color: 'var(--grey)', lineHeight: 1.8, marginBottom: 28 }}>
                  {contactPreviewSec.description || 'Share your product size, quantity, storage condition, and shipment requirement. Our team will suggest suitable packaging materials or a custom packing solution.'}
                </p>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  <button onClick={() => handleInquiry()} className="btn btn-primary">Send Enquiry <FaArrowRight /></button>
                  <Link to="/contact-us" className="btn btn-outline-dark">Contact Details</Link>
                </div>
              </div>
              <div className="grid grid-1" style={{ gap: 16 }}>
                {[
                  { icon: <FaMapMarkerAlt />, title: 'Address', value: settings.address || '253/19-A, Opp. Columbia Machine Pvt Ltd, GIDC Industrial Estate, Makarpura, Vadodara - 390010, Gujarat' },
                  { icon: <FaPhone />, title: 'Phone', value: settings.phone || '+91 7384 11611', link: `tel:${(settings.phone || '+917383411611').replace(/\s/g, '')}` },
                  { icon: <FaEnvelope />, title: 'Email', value: settings.email || 'vijay@vrpack.co.in', link: `mailto:${settings.email || 'vijay@vrpack.co.in'}` },
                ].map((item) => (
                  <div key={item.title} className="card" style={{ display: 'flex', alignItems: 'center', gap: 18, padding: 22 }}>
                    <div className="card-icon" style={{ marginBottom: 0, color: 'var(--orange)', flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <h4 style={{ fontSize: '1rem', marginBottom: 4 }}>{item.title}</h4>
                      {item.link ? <a href={item.link} style={{ color: 'var(--blue)', fontWeight: 600 }}>{item.value}</a> : <p style={{ color: 'var(--grey)', margin: 0, lineHeight: 1.6 }}>{item.value}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 12. INQUIRY CTA ── */}
      {hasSection('final-cta') && (
        <section style={{ background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)', padding: '80px 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span style={{ color: 'var(--orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>Get In Touch</span>
              <h2 style={{ color: 'var(--white)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10, marginBottom: 16 }}>
                {finalCtaSec.title || 'Need Packaging for Your Product?'}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: 540, margin: '0 auto 40px', lineHeight: 1.7 }}>
                {finalCtaSec.subtitle || 'Share your packaging requirement and our team will get back with a suitable solution.'}
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => handleInquiry()} className="btn btn-primary btn-lg">
                  <FaEnvelope /> Send Enquiry
                </button>
                <a href="tel:+917383411611" className="btn btn-outline btn-lg">
                  <FaPhone /> Call Now
                </a>
                <a href="https://wa.me/917383411611" target="_blank" rel="noreferrer" className="btn btn-lg" style={{ background: '#25d366', color: '#fff', border: '2px solid #25d366' }}>
                  <FaWhatsapp /> WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <InquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultProduct={selectedProduct} />
    </div>
  );
}
