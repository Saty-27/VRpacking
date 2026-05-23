import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaShieldAlt, FaIndustry, FaBoxOpen,
  FaArrowRight, FaBox, FaCubes,
  FaBoxes, FaCar, FaMicrochip, FaWarehouse,
  FaWrench, FaTruck, FaPhone,
  FaLayerGroup, FaThermometerHalf, FaTint, FaEnvelope
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
  const [gallery, setGallery] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    api.get('/products?limit=8').then(r => setProducts(r.data?.products || [])).catch(() => {});
    api.get('/gallery').then(r => setGallery(Array.isArray(r.data) ? r.data.slice(0, 8) : [])).catch(() => {});
  }, []);

  const handleInquiry = (productName = '') => {
    setSelectedProduct(productName);
    setModalOpen(true);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "VR Packaging Solutions",
    description: "Manufacturer of VCI & Seaworthy Packaging Solutions",
    address: { "@type": "PostalAddress", streetAddress: "253/19-A, GIDC Industrial Estate, Makarpura", addressLocality: "Vadodara", addressRegion: "Gujarat", postalCode: "390010", addressCountry: "IN" },
    telephone: "+917383411611",
    email: "vijay@vrpack.co.in",
    url: "https://www.vrpack.co.in"
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

  return (
    <div style={{ background: 'var(--white)', color: 'var(--navy)' }}>
      <SEOHead
        title="VCI & Seaworthy Packaging Solutions | VR Packaging Solutions"
        description="VR Packaging Solutions — Manufacturer of VCI products, seaworthy packaging, shrink films, barrier foil rolls, silpaulin covers, desiccants, and industrial packaging in Vadodara, Gujarat."
        keywords="VCI packaging Vadodara, seaworthy packing Gujarat, export packaging, industrial packaging, barrier foil, silpaulin cover, humidity indicator"
        schema={schema}
      />

      {/* ── 1. HERO ── */}
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
              Manufacturer of VCI &<br />
              <span style={{ color: 'var(--orange)' }}>Seaworthy Packaging</span> Solutions
            </motion.h1>
            <motion.p variants={fadeInUp} style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.82)', marginBottom: 40, maxWidth: 580, lineHeight: 1.7 }}>
              Protecting industrial goods from corrosion, moisture, dust, and transit damage with reliable packaging solutions.
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

      {/* ── 2. ABOUT PREVIEW ── */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ gap: 60, alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span style={{ color: 'var(--orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>Who We Are</span>
              <h2 style={{ marginTop: 10, marginBottom: 20 }}>VR Packaging Solutions</h2>
              <p style={{ color: 'var(--grey)', lineHeight: 1.85, marginBottom: 16 }}>
                VR Packaging Solutions provides custom-made packaging solutions for industrial, export, and seaworthy packing requirements. With <strong>15+ years of experience</strong>, we focus on corrosion protection, moisture control, safe handling, and reliable packaging for different industrial applications.
              </p>
              <p style={{ color: 'var(--grey)', lineHeight: 1.85, marginBottom: 28 }}>
                Our product range includes VCI films, aluminium barrier foils, shrink films, silpaulin covers, heavy-duty liner bags, desiccants, humidity indicators, and more — all available on inquiry.
              </p>
              <Link to="/about-us" className="btn btn-primary">
                Know More <FaArrowRight />
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

      {/* ── 3. SPECIALIZATION ── */}
      <section className="section" style={{ background: 'var(--navy)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <span style={{ color: 'var(--orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>What We Offer</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10, color: 'var(--white)' }}>Our Specialization</h2>
            <div style={{ width: 60, height: 4, background: 'var(--orange)', margin: '16px auto 0', borderRadius: 2 }} />
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-4" style={{ gap: 20 }}>
            {specializations.map((item, i) => (
              <motion.div key={i} variants={fadeInUp}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-lg)', padding: '28px 22px', transition: 'all 0.3s', cursor: 'default' }}
                onMouseOver={e => { e.currentTarget.style.background = 'rgba(230,92,0,0.12)'; e.currentTarget.style.borderColor = 'rgba(230,92,0,0.4)'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>
                <div style={{ fontSize: '1.8rem', color: 'var(--orange)', marginBottom: 14 }}>{item.icon}</div>
                <h4 style={{ color: 'var(--white)', fontSize: '1rem', marginBottom: 10, lineHeight: 1.4 }}>{item.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. PRODUCTS ── */}
      <section className="section" style={{ background: 'var(--grey-light)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <span style={{ color: 'var(--orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>Our Catalog</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10 }}>Our Packaging Products</h2>
            </div>
            <Link to="/products" className="btn btn-outline-dark" style={{ flexShrink: 0 }}>View All Products</Link>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer} className="grid grid-4" style={{ gap: 20 }}>
            {products.slice(0, 8).map((p) => (
              <motion.div key={p._id} variants={fadeInUp} className="card product-card"
                style={{ background: 'var(--white)', boxShadow: 'var(--shadow-card)', transition: 'var(--transition)' }}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ height: 210, position: 'relative', overflow: 'hidden' }}>
                  {p.images && p.images[0]
                    ? <img src={p.images[0].startsWith('http') ? p.images[0] : `${API_URL}${p.images[0]}`} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
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
                    <Link to={`/products/${p.slug}`} className="btn btn-outline-dark btn-sm" style={{ textAlign: 'center' }}>Details</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. WHY CHOOSE US ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <span style={{ color: 'var(--orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>Our Strengths</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10 }}>Why Choose VR Packaging Solutions?</h2>
            <div style={{ width: 60, height: 4, background: 'var(--orange)', margin: '16px auto 0', borderRadius: 2 }} />
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-3" style={{ gap: 24 }}>
            {whyUs.map((item, i) => (
              <motion.div key={i} variants={fadeInUp}
                style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '30px 26px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow-card)', transition: 'var(--transition)' }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ width: 52, height: 52, background: 'rgba(230,92,0,0.08)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: 'var(--orange)', marginBottom: 16 }}>
                  {item.icon}
                </div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: 10, color: 'var(--navy)' }}>{item.title}</h4>
                <p style={{ color: 'var(--grey)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. INDUSTRIES / APPLICATIONS ── */}
      <section className="section" style={{ background: 'var(--grey-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <span style={{ color: 'var(--orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>Applications</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10 }}>Applications Across Industries</h2>
            <p style={{ color: 'var(--grey)', marginTop: 12, fontSize: '1rem' }}>Our packaging solutions are suitable for industries such as:</p>
            <div style={{ width: 60, height: 4, background: 'var(--orange)', margin: '16px auto 0', borderRadius: 2 }} />
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-4" style={{ gap: 20 }}>
            {industries.map((ind, i) => (
              <motion.div key={i} variants={fadeInUp}
                style={{ background: 'var(--white)', border: '1px solid rgba(0,0,0,0.06)', padding: '28px 20px', borderRadius: 'var(--radius-lg)', textAlign: 'center', transition: 'all 0.3s', cursor: 'default' }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ fontSize: '2rem', color: 'var(--navy)', marginBottom: 14 }}>{ind.icon}</div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--navy)' }}>{ind.title}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 7. HOW WE WORK ── */}
      <section className="section" style={{ background: 'var(--navy)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <span style={{ color: 'var(--orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>Our Process</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10, color: 'var(--white)' }}>How We Work</h2>
            <div style={{ width: 60, height: 4, background: 'var(--orange)', margin: '16px auto 0', borderRadius: 2 }} />
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-4" style={{ gap: 20 }}>
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeInUp}
                style={{ position: 'relative', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '36px 24px 28px', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ position: 'absolute', top: -18, left: 24, width: 36, height: 36, background: 'var(--orange)', color: 'var(--white)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem' }}>
                  {step.num}
                </div>
                <h4 style={{ color: 'var(--white)', fontSize: '1rem', marginBottom: 12, lineHeight: 1.4 }}>{step.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 8. GALLERY PREVIEW ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <span style={{ color: 'var(--orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>Portfolio</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10 }}>Our Work Gallery</h2>
            <div style={{ width: 60, height: 4, background: 'var(--orange)', margin: '16px auto 0', borderRadius: 2 }} />
          </div>
          <div className="grid grid-4" style={{ gap: 16 }}>
            {gallery.length > 0
              ? gallery.map((img) => (
                <div key={img._id} style={{ height: 240, borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--grey-light)' }}>
                  <img
                    src={img.image ? (img.image.startsWith('http') ? img.image : `${API_URL}${img.image}`) : '/uploads/product_placeholder.png'}
                    alt={img.title || 'Packaging work'}
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
            <Link to="/gallery" className="btn btn-outline-dark">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* ── 9. INQUIRY CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span style={{ color: 'var(--orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>Get In Touch</span>
            <h2 style={{ color: 'var(--white)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10, marginBottom: 16 }}>
              Need Packaging for Your Product?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: 540, margin: '0 auto 40px', lineHeight: 1.7 }}>
              Share your packaging requirement and our team will get back with a suitable solution.
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

      <InquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultProduct={selectedProduct} />
    </div>
  );
}
