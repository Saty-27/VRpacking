import { useState, useEffect } from 'react';
import { Link, useSearchParams, Navigate } from 'react-router-dom';
import { FaSearch, FaBoxOpen, FaArrowRight, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SEOHead from '../components/common/SEOHead';
import InquiryModal from '../components/common/InquiryModal';
import api, { API_URL } from '../utils/api';
import { fallbackProducts } from '../utils/productFallbacks';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const activeCategory = searchParams.get('category') || '';
  const activeSearch = searchParams.get('search') || '';
  
  const [pageActive, setPageActive] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/categories').then(r => setCategories(r.data)),
      api.get('/pages').then(r => {
        const pg = r.data.find(p => p.slug === '/products');
        if (pg && pg.isActive === false) {
          setPageActive(false);
        }
      })
    ]).catch(() => {})
      .finally(() => setPageLoading(false));
  }, []);

  useEffect(() => {
    setSearch(activeSearch);
  }, [activeSearch]);

  useEffect(() => {
    let mounted = true;
    const params = {};
    if (activeCategory) params.category = activeCategory;
    if (search) params.search = search;
    params.limit = 50;
    setProductsLoading(true);
    setProductsError(false);

    api.get('/products', { params })
      .then(r => {
        if (!Array.isArray(r.data?.products)) {
          throw new Error('Invalid products response');
        }
        if (mounted) setProducts(r.data.products);
      })
      .catch(() => {
        if (mounted) {
          setProducts([]);
          setProductsError(true);
        }
      })
      .finally(() => {
        if (mounted) setProductsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [activeCategory, search]);

  const handleInquiry = (productName) => {
    setSelectedProduct(productName);
    setModalOpen(true);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);

    const nextParams = new URLSearchParams(searchParams);
    if (value.trim()) nextParams.set('search', value);
    else nextParams.delete('search');
    setSearchParams(nextParams, { replace: true });
  };

  if (!pageLoading && !pageActive) {
    return <Navigate to="/" replace />;
  }

  const canUseFallbackProducts = productsError && !activeCategory && !search;
  const visibleProducts = canUseFallbackProducts ? fallbackProducts : products;
  const productSkeletons = Array.from({ length: 6 }, (_, index) => index);

  return (
    <>
      <SEOHead title="Products - VCI Film, Barrier Foil, Packaging Solutions" description="Explore our range of VCI products, aluminium barrier foils, protective covers, and industrial packaging solutions." keywords="VCI film roll, aluminium barrier foil, humidity indicator, silpaulin cover, HDPE roll" />
      <section className="page-hero" style={{ backgroundImage: 'linear-gradient(135deg, rgba(17,24,39,0.92), rgba(17,24,39,0.92)), url("/products_banner.png")' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1>Our Products</h1>
            <p>Premium VCI & Industrial Packaging Solutions</p>
            <div className="breadcrumb" style={{justifyContent:'center',color:'rgba(255,255,255,0.6)'}}>
              <Link to="/" style={{color:'rgba(255,255,255,0.8)'}}>Home</Link> / <span style={{color:'var(--white)'}}>Products</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section"><div className="container">
        <div style={{display:'flex',flexWrap:'wrap',gap:16,marginBottom:40,alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
            <button className={`btn btn-sm ${!activeCategory?'btn-primary':'btn-outline-dark'}`} onClick={()=>setSearchParams({})}>All</button>
            {categories.map(c=>(
              <button key={c._id} className={`btn btn-sm ${activeCategory===c._id?'btn-primary':'btn-outline-dark'}`} onClick={()=>setSearchParams({category:c._id})}>{c.name}</button>
            ))}
          </div>
          <div style={{position:'relative'}}>
            <FaSearch style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--grey)'}}/>
            <input type="text" placeholder="Search products..." value={search} onChange={handleSearchChange} className="form-control" style={{paddingLeft:36,width:250}}/>
          </div>
        </div>
        {productsError && canUseFallbackProducts && (
          <div className="product-list-notice">
            Live product data is taking longer than expected, so core product links are shown for now.
          </div>
        )}

        <motion.div className="grid grid-3" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          {productsLoading ? productSkeletons.map(index => (
            <motion.div key={`product-skeleton-${index}`} className="card product-card product-card-skeleton" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <div className="product-image skeleton" />
              <div className="product-content">
                <div className="skeleton skeleton-line skeleton-line-lg" />
                <div className="skeleton skeleton-line" />
                <div className="skeleton skeleton-line skeleton-line-sm" />
                <div className="product-actions">
                  <div className="skeleton skeleton-button" />
                  <div className="skeleton skeleton-button" />
                </div>
              </div>
            </motion.div>
          )) : visibleProducts.map((p) => {
            const description = p.shortDescription || 'Industrial packaging product for protective, export, and transit-safe packing requirements.';
            return (
            <motion.div key={p._id} className="card product-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <div className="product-image">
                {p.images && p.images[0] ? <img src={p.images[0].startsWith('http') ? p.images[0] : `${API_URL}${p.images[0]}`} alt={p.name} loading="lazy" decoding="async" /> : <FaBoxOpen size={40} color="var(--blue)"/>}
              </div>
              <div className="product-content">
                <h3>{p.name}</h3>
                <p>{description.length > 120 ? `${description.substring(0, 120)}...` : description}</p>
                {p.features?.length > 0 && <ul style={{marginBottom:12}}>{p.features.slice(0,3).map((f,i)=>(<li key={i} style={{fontSize:'0.85rem',color:'var(--grey)',display:'flex',gap:6,alignItems:'center',marginBottom:4}}>✓ {f}</li>))}</ul>}
                <div className="product-actions">
                  <Link to={`/${p.slug}`} className="btn btn-primary btn-sm">View Details <FaArrowRight/></Link>
                  <button onClick={() => handleInquiry(p.name)} className="btn btn-outline-dark btn-sm"><FaEnvelope /> Enquiry</button>
                </div>
              </div>
            </motion.div>
          )})}
        </motion.div>
        {!productsLoading && visibleProducts.length === 0 && (
          <div className="product-empty-state">
            <FaBoxOpen size={34} />
            <h3>{productsError ? 'Products could not load right now' : 'No products found'}</h3>
            <p>
              {productsError
                ? 'Please refresh once or send an enquiry and our team will share the suitable product details.'
                : 'Try another category or search term.'}
            </p>
            {productsError && <button onClick={() => handleInquiry()} className="btn btn-primary">Send Enquiry</button>}
          </div>
        )}
      </div></section>

      <InquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultProduct={selectedProduct} />
    </>
  );
}
