import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter, FaYoutube, FaArrowUp, FaWhatsapp } from 'react-icons/fa';
import api from '../../utils/api';
import './Footer.css';

export default function Footer() {
  const [settings, setSettings] = useState(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    api.get('/settings').then(r => setSettings(r.data)).catch(() => {});
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const s = settings || {};

  const productLinks = [
    { label: 'VCI Film Roll', path: '/products/vci-film-roll' },
    { label: 'Aluminium Barrier Foil Rolls', path: '/products/aluminium-barrier-foil-rolls' },
    { label: 'Silpaulin Cover', path: '/products/silpaulin-cover' },
    { label: 'Heavy Duty Liner Bags', path: '/products/heavy-duty-liner-bags' },
    { label: 'Humidity Indicator', path: '/products/humidity-indicator' },
    { label: 'Desiccants', path: '/products/desiccants' },
    { label: 'LDPE Shrink Film', path: '/products/ldpe-shrink-film' },
    { label: 'HDPE Roll', path: '/products/hdpe-roll' },
  ];

  const serviceLinks = [
    { label: 'Seaworthy Packing', path: '/services' },
    { label: 'Shrink Wrapping', path: '/services' },
    { label: 'VCI Packaging', path: '/services' },
    { label: 'ODC & Cargo Project Packing', path: '/services' },
    { label: 'Packing Consultancy', path: '/services' },
    { label: 'Barrier Foil Packing', path: '/services' },
  ];

  const socialIcons = {
    facebook: <FaFacebookF />, linkedin: <FaLinkedinIn />, instagram: <FaInstagram />,
    twitter: <FaTwitter />, youtube: <FaYoutube />,
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-top">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-col footer-about">
                <div className="footer-logo">
                  <img src="/logo.png" alt="VR Packaging Solutions" style={{ height: '68px', width: 'auto', objectFit: 'contain', background: 'white', padding: '6px', borderRadius: '8px' }} />
                </div>
                <p>{s.footerDescription || 'VR Packaging Solutions provides industrial packaging materials and custom-made solutions for corrosion protection, moisture control, seaworthy packing, and transit safety.'}</p>
                <div className="footer-social">
                  {Object.entries(s.socialLinks || {}).map(([key, url]) => (
                    url && <a key={key} href={url} target="_blank" rel="noreferrer" className="social-icon">{socialIcons[key]}</a>
                  ))}
                </div>
              </div>

              <div className="footer-col">
                <h4>Quick Links</h4>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about-us">About Us</Link></li>
                  <li><Link to="/products">Products</Link></li>
                  <li><Link to="/services">Services</Link></li>
                  <li><Link to="/gallery">Gallery</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/contact-us">Contact Us</Link></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Products</h4>
                <ul>{productLinks.map(l => <li key={l.path}><Link to={l.path}>{l.label}</Link></li>)}</ul>
                <h4 style={{ marginTop: 20 }}>Services</h4>
                <ul>{serviceLinks.map(l => <li key={l.label}><Link to={l.path}>{l.label}</Link></li>)}</ul>
              </div>

              <div className="footer-col">
                <h4>Contact Us</h4>
                <div className="footer-contact">
                  <div className="contact-item"><FaMapMarkerAlt className="contact-icon" /><span>{s.address || '253/19-A, Opp. Columbia Machine Pvt Ltd, GIDC Industrial Estate, Makarpura, Vadodara - 390010, Gujarat'}</span></div>
                  <div className="contact-item"><FaPhone className="contact-icon" /><a href={`tel:${(s.phone || '+917383411611').replace(/\s/g, '')}`}>{s.phone || '+91 7384 11611'}</a></div>
                  <div className="contact-item"><FaEnvelope className="contact-icon" /><a href={`mailto:${s.email || 'vijay@vrpack.co.in'}`}>{s.email || 'vijay@vrpack.co.in'}</a></div>
                  <div className="contact-item"><FaWhatsapp className="contact-icon" /><a href={`https://wa.me/${s.whatsapp || '917383411611'}`} target="_blank" rel="noreferrer">WhatsApp Us</a></div>
                </div>
                {s.mapIframe && <div className="footer-map" dangerouslySetInnerHTML={{ __html: s.mapIframe }} />}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <p>{s.copyrightText || '© 2026 VR Packaging Solutions. All Rights Reserved.'}</p>
            <div className="footer-bottom-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-and-conditions">Terms & Conditions</Link>
              <Link to="/sitemap">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>

      <div className="floating-buttons">
        <a href={`https://wa.me/${s.whatsapp || '917383411611'}`} target="_blank" rel="noreferrer" className="floating-btn whatsapp" aria-label="WhatsApp"><FaWhatsapp /></a>
        <a href={`tel:${(s.phone || '+917383411611').replace(/\s/g, '')}`} className="floating-btn call" aria-label="Call"><FaPhone /></a>
      </div>

      {showTop && <button className="scroll-top" onClick={scrollToTop} aria-label="Back to top"><FaArrowUp /></button>}
    </>
  );
}
