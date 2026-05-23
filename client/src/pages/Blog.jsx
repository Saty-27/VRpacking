import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaSearch, FaGlobe, FaArrowRight, FaCalendar, FaTag } from 'react-icons/fa';
import { motion } from 'framer-motion';
import api, { API_URL } from '../utils/api';
import SEOHead from '../components/common/SEOHead';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || '';

  const categories = [
    'All',
    'VCI Packaging',
    'Seaworthy Packing',
    'Shrink Wrapping',
    'Industrial Packaging',
    'Moisture Protection',
    'Export Packaging',
  ];

  useEffect(() => {
    const params = { page, limit: 9 };
    if (category) params.category = category;
    if (search) params.search = search;
    api.get('/blogs', { params }).then(r => {
      setBlogs(r.data.blogs || []);
      setTotal(r.data.total || 0);
    }).catch(() => {});
  }, [page, category, search]);

  const handleCategory = (c) => {
    const p = new URLSearchParams();
    if (c !== 'All') p.set('category', c);
    setSearchParams(p);
  };

  return (
    <>
      <SEOHead
        title="Blog — Packaging Industry Insights | VR Packaging Solutions"
        description="Read articles on VCI packaging, seaworthy packing, shrink wrapping, industrial packaging, moisture protection, and export packaging best practices."
      />

      <section className="page-hero" style={{ backgroundImage: 'linear-gradient(135deg, rgba(17,24,39,0.92), rgba(17,24,39,0.92)), url("/blog_banner.png")' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1>Our Blog</h1>
            <p>Industry Insights & Packaging Tips</p>
            <div className="breadcrumb" style={{ justifyContent: 'center', color: 'rgba(255,255,255,0.6)', marginTop: 12 }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link> /
              <span style={{ color: 'var(--white)' }}>Blog</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filter + Search */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 44, justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {categories.map(c => (
                <button
                  key={c}
                  className={`btn btn-sm ${(c === 'All' && !category) || category === c ? 'btn-primary' : 'btn-outline-dark'}`}
                  style={{ borderRadius: 4 }}
                  onClick={() => handleCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <div style={{ position: 'relative' }}>
              <FaSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--grey)', fontSize: '0.85rem' }} />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="form-control"
                style={{ paddingLeft: 36, width: 240 }}
              />
            </div>
          </div>

          {/* Blog Grid */}
          <motion.div
            className="grid grid-3"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            style={{ gap: 24 }}
          >
            {blogs.map(b => (
              <motion.div key={b._id} className="card blog-card"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <div className="blog-image">
                  {b.featuredImage ? (
                    <img src={b.featuredImage.startsWith('http') ? b.featuredImage : `${API_URL}${b.featuredImage}`} alt={b.title} />
                  ) : (
                    <FaGlobe size={28} color="var(--grey)" style={{ opacity: 0.4 }} />
                  )}
                </div>
                <div className="blog-content">
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' }}>
                    <span className="badge badge-orange">{b.category}</span>
                  </div>
                  <h4>{b.title}</h4>
                  <p>{b.excerpt?.substring(0, 120)}...</p>
                  <Link to={`/blog/${b.slug}`} className="blog-link">
                    Read More <FaArrowRight style={{ fontSize: '0.8rem' }} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {blogs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--grey)' }}>
              <p>No blog posts found.</p>
            </div>
          )}

          {/* Pagination */}
          {total > 9 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 48 }}>
              {Array.from({ length: Math.ceil(total / 9) }).map((_, i) => (
                <button
                  key={i}
                  className={`btn btn-sm ${page === i + 1 ? 'btn-primary' : 'btn-outline-dark'}`}
                  style={{ borderRadius: 4, minWidth: 40 }}
                  onClick={() => {
                    const p = new URLSearchParams(searchParams);
                    p.set('page', i + 1);
                    setSearchParams(p);
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
