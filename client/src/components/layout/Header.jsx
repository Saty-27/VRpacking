import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaChevronDown } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import api from '../../utils/api';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    api.get('/settings').then(r => setSettings(r.data)).catch(() => {});
    api.get('/categories').then(r => setCategories(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setProductsOpen(false); }, [location]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about-us' },
    { label: 'Products', path: '/products', hasDropdown: true },
    { label: 'Services', path: '/services' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact Us', path: '/contact-us' },
  ];

  const phone = settings?.phone || '+91 7384 11611';
  const whatsapp = settings?.whatsapp || '917383411611';

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <Link to="/" className="header-logo">
          <img src="/logo.png" alt="VR Packaging Solutions Logo" style={{ height: '68px', width: 'auto', objectFit: 'contain' }} />
        </Link>

        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            {navLinks.map(link => (
              <li key={link.path} className={`nav-item ${link.hasDropdown ? 'has-dropdown' : ''}`}>
                {link.hasDropdown ? (
                  <>
                    <Link to={link.path} className={location.pathname.startsWith(link.path) ? 'active' : ''}>
                      {link.label} <FaChevronDown className="dropdown-icon" />
                    </Link>
                    <div className="dropdown-menu">
                      <Link to="/products" className="dropdown-item">All Products</Link>
                      {categories.map(cat => (
                        <Link key={cat._id} to={`/products?category=${cat._id}`} className="dropdown-item">{cat.name}</Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link to={link.path} className={location.pathname === link.path ? 'active' : ''}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="nav-actions-mobile">
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="btn btn-primary btn-sm"><FaPhone /> Call Now</a>
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-sm" style={{ background: '#25d366', color: '#fff' }}><FaWhatsapp /> WhatsApp</a>
          </div>
        </nav>

        <div className="header-actions">
          <a href={`tel:${phone.replace(/\s/g, '')}`} className="btn btn-primary btn-sm"><FaPhone /> Call Now</a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
}
