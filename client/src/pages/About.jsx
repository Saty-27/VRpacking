import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaShieldAlt, FaCogs, FaIndustry, FaCheckCircle, FaArrowRight,
  FaGlobeAmericas, FaShip, FaUsers, FaHandshake, FaBullseye, FaEye,
  FaLayerGroup, FaTint, FaThermometerHalf, FaBox, FaWrench, FaTruck
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import SEOHead from '../components/common/SEOHead';
import api from '../utils/api';

const fadeInUp = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.09 } } };

export default function About() {
  const [sections, setSections] = useState([]);
  useEffect(() => { api.get('/sections/about').then(r => setSections(r.data)).catch(() => {}); }, []);
  const getSection = (key) => sections.find(s => s.sectionKey === key) || {};

  const intro = getSection('introduction');
  const mv    = getSection('mission-vision');
  const whyUs = getSection('why-us');
  const expertise = getSection('expertise');
  const cta   = getSection('cta');

  const whatWeDo = [
    { icon: <FaShieldAlt />, title: 'VCI Packaging Solutions', desc: 'VCI films, barrier foils, and covers for corrosion protection during storage and transport.' },
    { icon: <FaShip />, title: 'Seaworthy Packing', desc: 'ISPM-15 compliant packaging for international and export shipments.' },
    { icon: <FaThermometerHalf />, title: 'Shrink Wrapping', desc: 'Thermo shrink packing for product protection and secure handling.' },
    { icon: <FaLayerGroup />, title: 'Barrier Foil Packing', desc: 'Aluminium barrier foil packing for preservation and moisture protection.' },
    { icon: <FaGlobeAmericas />, title: 'Silpaulin / Tarpaulin Covers', desc: 'Heavy-duty rolls and covers for industrial and outdoor applications.' },
    { icon: <FaTint />, title: 'Humidity Control Products', desc: 'Desiccants and humidity indicators for moisture-sensitive goods.' },
    { icon: <FaBox />, title: 'Heavy Duty Liner Bags', desc: 'Industrial liner bags for bulk and heavy goods packaging.' },
    { icon: <FaWrench />, title: 'Industrial Protective Covers', desc: 'Custom-made covers to protect machinery and industrial goods.' },
  ];

  const whyUsCards = (whyUs.contentBlocks) || [
    { title: '15+ Years of Experience', description: 'Industry experience in protective and industrial packaging solutions.' },
    { title: 'Custom-Made Packaging', description: 'Packaging solutions designed according to product size, handling, and transportation needs.' },
    { title: 'Wide Product Range', description: 'Films, rolls, bags, covers, liners, desiccants, and more for varied industrial needs.' },
    { title: 'Corrosion & Moisture Protection', description: 'VCI films, barrier foils, desiccants, and humidity indicators for safer storage and transit.' },
    { title: 'Export & Seaworthy Packing', description: 'Packaging suitable for long-distance movement and export handling requirements.' },
    { title: 'Inquiry-Based Guidance', description: 'Customers can share their requirements and receive suitable product or packaging suggestions.' },
  ];

  const whyIcons = [<FaCogs />, <FaShieldAlt />, <FaBox />, <FaTint />, <FaShip />, <FaHandshake />];

  const missionVision = (mv.contentBlocks) || [
    { title: 'Our Mission', description: 'To provide reliable packaging solutions that help protect products during storage, handling, and transportation.' },
    { title: 'Our Vision', description: 'To become a dependable packaging partner for industries requiring VCI, preservation, protective, and seaworthy packaging solutions.' },
  ];

  return (
    <>
      <SEOHead
        title="About Us — VR Packaging Solutions | Industrial Packaging Vadodara"
        description="Learn about VR Packaging Solutions, a provider of VCI packaging, seaworthy packing, shrink wrapping, barrier foil, and industrial protective packaging in Vadodara, Gujarat."
      />

      {/* Page Hero */}
      <section className="page-hero" style={{ backgroundImage: 'linear-gradient(135deg, rgba(17,24,39,0.92), rgba(17,24,39,0.92)), url("/about_banner.png")' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1>About VR Packaging Solutions</h1>
            <p>Reliable industrial, VCI, and seaworthy packaging solutions.</p>
            <div className="breadcrumb" style={{ justifyContent: 'center', color: 'rgba(255,255,255,0.6)', marginTop: 12 }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link> /
              <span style={{ color: 'var(--white)' }}>About Us</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ gap: 60, alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span style={{ color: 'var(--orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>Who We Are</span>
              <h2 style={{ marginTop: 10, marginBottom: 20 }}>{intro.title || 'Company Introduction'}</h2>
              <p style={{ color: 'var(--grey)', lineHeight: 1.85, marginBottom: 16 }}>
                {intro.description || 'VR Packaging Solutions is engaged in providing industrial packaging materials and custom-made packaging solutions for corrosion protection, moisture control, preservation, and transit safety.'}
              </p>
              <p style={{ color: 'var(--grey)', lineHeight: 1.85 }}>
                With <strong style={{ color: 'var(--navy)' }}>15+ years of experience</strong>, the company focuses on practical packaging solutions for industrial and export requirements — including VCI films, aluminium barrier foils, seaworthy packing, silpaulin covers, shrink wrapping, desiccants, humidity indicators, and more.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ borderRadius: 16, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300, boxShadow: 'var(--shadow-lg)' }}>
                <img 
                  src="/about_banner.png" 
                  alt="VR Packaging Solutions Factory" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 300 }} 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section" style={{ background: 'var(--grey-light)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Mission & Vision</h2>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-2" style={{ gap: 35 }}>
            {/* Mission Card */}
            {missionVision[0] && (
              <motion.div variants={fadeInUp} className="mission-card">
                <div className="card-icon-wrap">
                  <FaBullseye />
                </div>
                <h3 style={{ marginBottom: 14, color: 'var(--navy)', fontWeight: 700 }}>{missionVision[0].title}</h3>
                <p style={{ color: 'var(--grey)', lineHeight: 1.8, margin: 0, fontSize: '1rem' }}>{missionVision[0].description}</p>
              </motion.div>
            )}

            {/* Vision Card */}
            {missionVision[1] && (
              <motion.div variants={fadeInUp} className="vision-card">
                <div className="card-icon-wrap">
                  <FaEye />
                </div>
                <h3 style={{ marginBottom: 14, color: 'var(--white)', fontWeight: 700 }}>{missionVision[1].title}</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.8, margin: 0, fontSize: '1rem' }}>{missionVision[1].description}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>What We Do</h2>
            <p className="subtitle">Our packaging solutions cover a wide range of industrial and export requirements.</p>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-4" style={{ gap: 20 }}>
            {whatWeDo.map((item, i) => (
              <motion.div key={i} variants={fadeInUp}
                style={{ background: 'var(--white)', borderRadius: 10, padding: '26px 22px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow-card)', transition: 'var(--transition)' }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ fontSize: '1.5rem', color: 'var(--orange)', marginBottom: 12 }}>{item.icon}</div>
                <h4 style={{ fontSize: '0.95rem', marginBottom: 8, color: 'var(--navy)' }}>{item.title}</h4>
                <p style={{ color: 'var(--grey)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section" style={{ background: 'var(--navy)' }}>
        <div className="container">
          <div className="section-header" style={{ color: 'var(--white)' }}>
            <h2 style={{ color: 'var(--white)' }}>{whyUs.title || 'Why Choose Us'}</h2>
            <p className="subtitle" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {whyUs.description || 'We focus on practical, custom-made packaging that addresses real industrial and export needs.'}
            </p>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-3" style={{ gap: 20 }}>
            {whyUsCards.map((item, i) => (
              <motion.div key={i} variants={fadeInUp}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '26px 22px' }}>
                <div style={{ fontSize: '1.3rem', color: 'var(--orange)', marginBottom: 12 }}>{whyIcons[i] || <FaCheckCircle />}</div>
                <h4 style={{ color: 'var(--white)', fontSize: '1rem', marginBottom: 8 }}>{item.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-gradient">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--white)', marginBottom: 14 }}>{cta.title || 'Looking for Suitable Packaging?'}</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 30, fontSize: '1.05rem' }}>
            {cta.subtitle || 'Contact us today and share your packaging requirement.'}
          </p>
          <Link to="/contact-us" className="btn btn-primary btn-lg" style={{ borderRadius: 4 }}>
            Contact Us Today <FaArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
