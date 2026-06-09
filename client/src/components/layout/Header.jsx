import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaChevronDown, FaSearch, FaBoxOpen } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import api, { API_URL } from '../../utils/api';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const [activePages, setActivePages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    api.get('/settings').then(r => setSettings(r.data)).catch(() => {});
    api.get('/categories').then(r => setCategories(r.data)).catch(() => {});
    api.get('/pages').then(r => {
      const activeSlugs = r.data.filter(p => p.isActive !== false).map(p => p.slug);
      setActivePages(activeSlugs);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProductsOpen(false);
    setSearchOpen(false);
  }, [location]);

  useEffect(() => {
    const query = searchQuery.trim();
    if (query.length < 2) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    let active = true;
    setSearchLoading(true);
    const timer = setTimeout(() => {
      api.get('/products', { params: { search: query, limit: 6, suggest: 1 } })
        .then(r => {
          if (active) setSearchResults(Array.isArray(r.data?.products) ? r.data.products : []);
        })
        .catch(() => {
          if (active) setSearchResults([]);
        })
        .finally(() => {
          if (active) setSearchLoading(false);
        });
    }, 250);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [searchQuery]);

  useEffect(() => {
    const closeSearch = (event) => {
      const inDesktop = desktopSearchRef.current?.contains(event.target);
      const inMobile = mobileSearchRef.current?.contains(event.target);
      if (!inDesktop && !inMobile) setSearchOpen(false);
    };

    document.addEventListener('mousedown', closeSearch);
    return () => document.removeEventListener('mousedown', closeSearch);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about-us' },
    { label: 'Products', path: '/products', hasDropdown: true },
    { label: 'Services', path: '/services' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Video Gallery', path: '/video-gallery' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact Us', path: '/contact-us' },
  ];

  const visibleLinks = navLinks.filter(link => {
    if (activePages.length === 0) return true;
    return activePages.includes(link.path);
  });

  const phone = settings?.phone || '+91 7384 11611';
  const whatsapp = settings?.whatsapp || '917383411611';
  const hasSearchQuery = searchQuery.trim().length >= 2;

  const goToSearchResults = () => {
    const query = searchQuery.trim();
    if (!query) return;

    navigate(`/products?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setMenuOpen(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    goToSearchResults();
  };

  const getProductImage = (product) => {
    const image = product.images?.[0];
    if (!image) return '';
    return image.startsWith('http') ? image : `${API_URL}${image}`;
  };

  const renderSearchBox = (className, ref) => (
    <div className={`header-search ${className}`} ref={ref}>
      <form className="header-search-form" onSubmit={handleSearchSubmit}>
        <FaSearch className="header-search-icon" />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            setSearchOpen(true);
          }}
          onFocus={() => setSearchOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setSearchOpen(false);
          }}
          placeholder="Search products..."
          aria-label="Search products"
        />
        {searchQuery && (
          <button
            type="button"
            className="header-search-clear"
            onClick={() => {
              setSearchQuery('');
              setSearchResults([]);
              setSearchOpen(false);
            }}
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
      </form>

      {searchOpen && hasSearchQuery && (
        <div className="header-search-panel">
          {searchLoading && (
            <div className="header-search-state">Searching products...</div>
          )}

          {!searchLoading && searchResults.length > 0 && (
            <>
              <div className="header-search-results">
                {searchResults.map(product => {
                  const image = getProductImage(product);
                  return (
                    <Link
                      key={product._id}
                      to={`/${product.slug}`}
                      className="header-search-result"
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                        setMenuOpen(false);
                      }}
                    >
                      <span className="header-search-thumb">
                        {image ? (
                          <img src={image} alt={product.name} loading="lazy" decoding="async" />
                        ) : (
                          <FaBoxOpen />
                        )}
                      </span>
                      <span className="header-search-copy">
                        <strong>{product.name}</strong>
                        <small>{product.category?.name || 'Product'}</small>
                      </span>
                    </Link>
                  );
                })}
              </div>
              <button type="button" className="header-search-all" onClick={goToSearchResults}>
                View all results for "{searchQuery.trim()}"
              </button>
            </>
          )}

          {!searchLoading && searchResults.length === 0 && (
            <div className="header-search-state">
              No product found. Press Enter to search all products.
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <Link to="/" className="header-logo">
          <img src="/logo.png" alt="VR Packaging Solutions Logo" className="logo-img" />
          <span className="logo-text">
            <span className="logo-main"><span className="logo-text-orange">V R</span> Packaging</span>
            <span className="logo-sub" aria-label="Solutions">
              {'SOLUTIONS'.split('').map((letter, index) => <span key={`${letter}-${index}`}>{letter}</span>)}
            </span>
          </span>
        </Link>

        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          {renderSearchBox('mobile-search', mobileSearchRef)}
          <ul className="nav-list">
            {visibleLinks.map(link => (
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

        {renderSearchBox('desktop-search', desktopSearchRef)}

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
