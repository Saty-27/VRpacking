import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaIndustry, FaEnvelope, FaWhatsapp, FaPhone, FaShareAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SEOHead from '../components/common/SEOHead';
import InquiryModal from '../components/common/InquiryModal';
import api, { API_URL } from '../utils/api';

export default function GalleryDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/gallery/${slug}`)
      .then(r => {
        setItem(r.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="loading" style={{ minHeight: '60vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="page-hero">
        <div className="container">
          <h1>Project Not Found</h1>
          <p style={{ marginTop: 10, color: 'rgba(255, 255, 255, 0.7)' }}>The gallery project you are looking for does not exist or has been moved.</p>
          <Link to="/gallery" className="btn btn-primary" style={{ marginTop: 24 }}>
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={item.metaTitle || `${item.title} - Packaging Projects | VR Packaging Solutions`}
        description={item.metaDescription || item.caption || `View our professional ${item.title} work under ${item.category}.`}
        keywords={item.keywords || `${item.title}, ${item.category}, packaging portfolio, seaworthy packaging`}
      />

      <section className="page-hero" style={{ backgroundImage: 'linear-gradient(135deg, rgba(17,24,39,0.92), rgba(17,24,39,0.92)), url("/gallery_banner.png")' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge badge-orange" style={{ marginBottom: 12 }}>{item.category}</span>
            <h1>{item.title}</h1>
            <div className="breadcrumb" style={{ justifyContent: 'center', color: 'rgba(255,255,255,0.6)', marginTop: 12 }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link> / 
              <Link to="/gallery" style={{ color: 'rgba(255,255,255,0.8)' }}>Gallery</Link> / 
              <span style={{ color: 'var(--white)' }}>{item.title}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Link to="/gallery" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--blue)', fontWeight: 600, marginBottom: 30 }}>
            <FaArrowLeft /> Back to Gallery
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 50, alignItems: 'start' }}>
            {/* Left side: Image */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6 }}
              className="card"
              style={{ padding: 0, overflow: 'hidden', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)' }}
            >
              {item.image ? (
                <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
                  <img
                    src={item.image.startsWith('http') ? item.image : `${API_URL}${item.image}`}
                    alt={item.title}
                    style={{ width: '100%', display: 'block', transition: 'transform 0.5s' }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
              ) : (
                <div style={{ height: 400, background: 'var(--grey-light)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--grey)' }}>
                  <FaIndustry size={60} style={{ opacity: 0.3, marginBottom: 12 }} />
                  <span>No image preview available</span>
                </div>
              )}
            </motion.div>

            {/* Right side: Project Details */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6 }}
            >
              <h2 style={{ fontSize: '2rem', marginBottom: 6 }}>{item.title}</h2>
              <span className="badge badge-blue" style={{ marginBottom: 24, fontSize: '0.85rem' }}>Category: {item.category}</span>
              
              <div className="card" style={{ marginBottom: 30, background: 'var(--grey-light)', borderLeft: '4px solid var(--orange)' }}>
                <h4 style={{ marginBottom: 10, color: 'var(--navy)' }}>Project Overview</h4>
                <p style={{ color: 'var(--grey-dark)', lineHeight: 1.8, margin: 0 }}>
                  {item.caption || 'This project showcases our custom packaging engineering designed to withstand rigorous shipping and weather conditions. Every solution is fabricated to meet high international standards, ensuring cargo safety, rust protection, and structural integrity throughout transit.'}
                </p>
              </div>

              {/* Inquiry Call to Action */}
              <div className="card glass-dark" style={{ background: 'var(--navy)', color: 'var(--white)', padding: 30, borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ color: 'var(--white)', marginBottom: 12, fontSize: '1.25rem' }}>Interested in a Similar Solution?</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', marginBottom: 24, lineHeight: 1.6 }}>
                  Contact our engineering team to design custom, ISPM-15 compliant, rust-inhibited packaging for your industrial products or heavy export cargo.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => setModalOpen(true)} 
                    className="btn btn-primary"
                    style={{ flex: '1 1 auto' }}
                  >
                    <FaEnvelope /> Request Information
                  </button>
                  <a 
                    href="https://wa.me/917383411611" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn" 
                    style={{ background: '#25d366', color: '#fff', borderColor: '#25d366', flex: '1 1 auto' }}
                  >
                    <FaWhatsapp /> WhatsApp
                  </a>
                  <a 
                    href="tel:+917383411611" 
                    className="btn btn-secondary" 
                    style={{ flex: '1 1 auto' }}
                  >
                    <FaPhone /> Call Now
                  </a>
                </div>
              </div>

              {/* Share button */}
              <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 10, color: 'var(--grey)', fontSize: '0.9rem' }}>
                <FaShareAlt />
                <span>Share this project profile:</span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }}
                  className="btn btn-sm btn-outline-dark" 
                  style={{ padding: '4px 12px', fontSize: '0.8rem', borderRadius: 4 }}
                >
                  Copy URL
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <InquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultProduct={`Gallery Project: ${item.title}`} />
    </>
  );
}
