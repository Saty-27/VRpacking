import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FaTimes, FaVideo, FaEye, FaArrowRight, FaPlay, FaYoutube } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SEOHead from '../components/common/SEOHead';
import api, { API_URL } from '../utils/api';

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  
  const [pageActive, setPageActive] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

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
    Promise.all([
      api.get('/pages').then(r => {
        const pg = r.data.find(p => p.slug === '/video-gallery');
        if (pg && pg.isActive === false) {
          setPageActive(false);
        }
      }),
      (async () => {
        try {
          const r = await api.get('/gallery', { params: { isActive: true } });
          const allItems = r.data || [];
          const videoItems = allItems.filter(item => item.mediaType === 'video');
          
          if (activeCategory !== 'All') {
            setVideos(videoItems.filter(v => v.category === activeCategory));
          } else {
            setVideos(videoItems);
          }
        } catch {}
      })()
    ]).catch(() => {})
      .finally(() => setPageLoading(false));
  }, [activeCategory]);

  if (pageLoading) {
    return <div className="loading" style={{ minHeight: '60vh' }}><div className="spinner" /></div>;
  }

  if (!pageActive) {
    return <Navigate to="/" replace />;
  }

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      const videoId = match[2];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    return url; // Fallback
  };

  return (
    <>
      <SEOHead
        title="Video Gallery — Packaging Projects in Action | VR Packaging Solutions"
        description="Watch video demonstrations of our VCI packaging materials, seaworthy export packing, shrink wrapping, and industrial logistics solutions."
      />

      <section className="page-hero" style={{ backgroundImage: 'linear-gradient(135deg, rgba(17,24,39,0.92), rgba(17,24,39,0.92)), url("/gallery_banner.png")' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1>Video Gallery</h1>
            <p>See Our Packaging & Rust Protection Solutions in Action</p>
            <div className="breadcrumb" style={{ justifyContent: 'center', color: 'rgba(255,255,255,0.6)', marginTop: 12 }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link> /
              <span style={{ color: 'var(--white)' }}>Video Gallery</span>
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

          {/* Videos Grid */}
          <div className="gallery-grid">
            {videos.map((vid, i) => (
              <div
                key={vid._id}
                className="gallery-thumb"
                style={{ cursor: 'pointer' }}
              >
                {vid.image ? (
                  <img
                    src={vid.image.startsWith('http') ? vid.image : `${API_URL}${vid.image}`}
                    alt={vid.title || vid.category}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="gallery-placeholder" style={{ background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' }}>
                    <FaVideo size={40} style={{ color: 'var(--orange-light)', marginBottom: 8 }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{vid.category}</span>
                  </div>
                )}

                {/* Play Icon Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: 'rgba(230, 92, 0, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.25rem',
                  boxShadow: '0 4px 15px rgba(230, 92, 0, 0.4)',
                  zIndex: 1,
                  transition: 'all 0.3s ease'
                }} className="play-button-center">
                  <FaPlay style={{ marginLeft: 3 }} />
                </div>
                
                <div className="gallery-thumb-overlay">
                  <h3>{vid.title || 'Packaging Project Video'}</h3>
                  <span className="cat-badge">{vid.category}</span>
                  <div className="gallery-actions">
                    <button 
                      className="gallery-act-btn" 
                      onClick={(e) => { e.stopPropagation(); setLightbox(i); }} 
                      title="Play Video"
                    >
                      <FaPlay size={12} />
                    </button>
                    <Link 
                      to={`/video-gallery/${vid.slug}`} 
                      className="gallery-act-btn" 
                      title="View Details"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {videos.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--grey)' }}>
              <FaVideo size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
              <p>No videos found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Video Player */}
      {lightbox !== null && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer', lineHeight: 1, zIndex: 10000 }}
            aria-label="Close"
          >
            <FaTimes />
          </button>
          
          <div 
            style={{ textAlign: 'center', color: 'white', width: '90vw', maxWidth: '850px' }} 
            onClick={e => e.stopPropagation()}
          >
            <div style={{ 
              position: 'relative', 
              width: '100%', 
              paddingTop: '56.25%', /* 16:9 Aspect Ratio */
              background: '#000', 
              borderRadius: 12, 
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
              {videos[lightbox]?.videoType === 'youtube' ? (
                <iframe
                  src={getYouTubeEmbedUrl(videos[lightbox].videoUrl)}
                  title={videos[lightbox].title}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : videos[lightbox]?.videoType === 'local' ? (
                <video
                  src={videos[lightbox].videoUrl.startsWith('http') ? videos[lightbox].videoUrl : `${API_URL}${videos[lightbox].videoUrl}`}
                  controls
                  autoPlay
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span>Invalid Video Source</span>
                </div>
              )}
            </div>

            <div style={{ marginTop: 20, textAlign: 'left', padding: '0 10px' }}>
              <span className="badge badge-orange" style={{ marginBottom: 8 }}>{videos[lightbox]?.category}</span>
              <h3 style={{ color: 'white', fontSize: '1.4rem', margin: '4px 0 10px 0' }}>{videos[lightbox]?.title}</h3>
              {videos[lightbox]?.caption && (
                <p style={{ opacity: 0.8, fontSize: '0.95rem', lineHeight: 1.6 }}>{videos[lightbox].caption}</p>
              )}
              <div style={{ marginTop: 15 }}>
                <Link to={`/video-gallery/${videos[lightbox]?.slug}`} className="btn btn-primary btn-sm" style={{ borderRadius: 6 }}>
                  View Full Details <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Prev / Next controls */}
          {lightbox > 0 && (
            <button onClick={e => { e.stopPropagation(); setLightbox(lightbox - 1); }}
              style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '12px 16px', borderRadius: 8, cursor: 'pointer', fontSize: '1.2rem', zIndex: 10000 }}>
              ‹
            </button>
          )}
          {lightbox < videos.length - 1 && (
            <button onClick={e => { e.stopPropagation(); setLightbox(lightbox + 1); }}
              style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '12px 16px', borderRadius: 8, cursor: 'pointer', fontSize: '1.2rem', zIndex: 10000 }}>
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
