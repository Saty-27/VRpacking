import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaIndustry, FaEye, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SEOHead from '../components/common/SEOHead';
import api, { API_URL } from '../utils/api';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const categories = [
    'All',
    'VCI Products',
    'Films & Rolls',
    'Seaworthy Packing',
    'Shrink Packing',
    'Silpaulin Covers',
    'Barrier Foil Packing',
    'Industrial Packaging',
  ];

  useEffect(() => {
    const params = activeCategory !== 'All' ? { category: activeCategory } : {};
    api.get('/gallery', { params }).then(r => setImages(r.data)).catch(() => {});
  }, [activeCategory]);

  return (
    <>
      <SEOHead
        title="Gallery — Packaging Projects Portfolio | VR Packaging Solutions"
        description="View our gallery of VCI packaging, seaworthy packing, shrink wrapping, barrier foil, silpaulin covers, and industrial packaging projects."
      />

      <section className="page-hero" style={{ backgroundImage: 'linear-gradient(135deg, rgba(17,24,39,0.92), rgba(17,24,39,0.92)), url("/gallery_banner.png")' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1>Our Gallery</h1>
            <p>See Our Packaging Solutions in Action</p>
            <div className="breadcrumb" style={{ justifyContent: 'center', color: 'rgba(255,255,255,0.6)', marginTop: 12 }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link> /
              <span style={{ color: 'var(--white)' }}>Gallery</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Category Filter */}
          <div className="category-filter-wrap">
            {categories.map(c => (
              <button
                key={c}
                className={`btn btn-sm ${activeCategory === c ? 'btn-primary' : 'btn-outline-dark'}`}
                style={{ borderRadius: 4 }}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {images.map((img, i) => (
              <div
                key={img._id}
                className="gallery-thumb"
              >
                {img.image
                  ? <img
                      src={img.image.startsWith('http') ? img.image : `${API_URL}${img.image}`}
                      alt={img.title || img.category}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  : <div className="gallery-placeholder">
                      <FaIndustry size={30} />
                      <span>{img.category}</span>
                    </div>
                }
                
                <div className="gallery-thumb-overlay">
                  <h3>{img.title || 'Packaging Project'}</h3>
                  <span className="cat-badge">{img.category}</span>
                  <div className="gallery-actions">
                    <button 
                      className="gallery-act-btn" 
                      onClick={() => setLightbox(i)} 
                      title="Quick View"
                    >
                      <FaEye />
                    </button>
                    <Link 
                      to={`/gallery/${img.slug}`} 
                      className="gallery-act-btn" 
                      title="View Details"
                    >
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {images.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--grey)' }}>
              <FaIndustry size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
              <p>No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}
            aria-label="Close"
          >
            <FaTimes />
          </button>
          <div style={{ textAlign: 'center', color: 'white', maxWidth: '90vw' }} onClick={e => e.stopPropagation()}>
            {images[lightbox]?.image
              ? <img
                  src={images[lightbox].image.startsWith('http') ? images[lightbox].image : `${API_URL}${images[lightbox].image}`}
                  alt={images[lightbox].title}
                  style={{ maxWidth: '90vw', maxHeight: '80vh', borderRadius: 12, objectFit: 'contain', display: 'block', margin: '0 auto' }}
                />
              : <div style={{ width: 600, height: 400, background: 'rgba(255,255,255,0.05)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                  <FaIndustry size={60} style={{ opacity: 0.3 }} />
                </div>
            }
            {(images[lightbox]?.caption || images[lightbox]?.title) && (
              <p style={{ marginTop: 14, opacity: 0.7, fontSize: '0.95rem' }}>{images[lightbox]?.caption || images[lightbox]?.title}</p>
            )}
          </div>
          {/* Prev / Next */}
          {lightbox > 0 && (
            <button onClick={e => { e.stopPropagation(); setLightbox(lightbox - 1); }}
              style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '12px 16px', borderRadius: 8, cursor: 'pointer', fontSize: '1.2rem' }}>
              ‹
            </button>
          )}
          {lightbox < images.length - 1 && (
            <button onClick={e => { e.stopPropagation(); setLightbox(lightbox + 1); }}
              style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '12px 16px', borderRadius: 8, cursor: 'pointer', fontSize: '1.2rem' }}>
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
