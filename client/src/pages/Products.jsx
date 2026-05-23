import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaSearch, FaBoxOpen, FaArrowRight, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SEOHead from '../components/common/SEOHead';
import InquiryModal from '../components/common/InquiryModal';
import api, { API_URL } from '../utils/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const activeCategory = searchParams.get('category') || '';

  useEffect(() => { api.get('/categories').then(r => setCategories(r.data)).catch(() => {}); }, []);
  useEffect(() => {
    const params = {};
    if (activeCategory) params.category = activeCategory;
    if (search) params.search = search;
    params.limit = 50;
    api.get('/products', { params }).then(r => setProducts(r.data.products || [])).catch(() => {});
  }, [activeCategory, search]);

  const handleInquiry = (productName) => {
    setSelectedProduct(productName);
    setModalOpen(true);
  };

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
            <input type="text" placeholder="Search products..." value={search} onChange={e=>setSearch(e.target.value)} className="form-control" style={{paddingLeft:36,width:250}}/>
          </div>
        </div>
        <motion.div className="grid grid-3" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          {products.map((p, i) => (
            <motion.div key={p._id} className="card product-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <div className="product-image">
                {p.images && p.images[0] ? <img src={p.images[0].startsWith('http') ? p.images[0] : `${API_URL}${p.images[0]}`} alt={p.name} /> : <FaBoxOpen size={40} color="var(--blue)"/>}
              </div>
              <div className="product-content">
                <h3>{p.name}</h3>
                <p>{p.shortDescription?.substring(0,120)}...</p>
                {p.features?.length > 0 && <ul style={{marginBottom:12}}>{p.features.slice(0,3).map((f,i)=>(<li key={i} style={{fontSize:'0.85rem',color:'var(--grey)',display:'flex',gap:6,alignItems:'center',marginBottom:4}}>✓ {f}</li>))}</ul>}
                <div className="product-actions">
                  <Link to={`/products/${p.slug}`} className="btn btn-primary btn-sm">View Details <FaArrowRight/></Link>
                  <button onClick={() => handleInquiry(p.name)} className="btn btn-outline-dark btn-sm"><FaEnvelope /> Enquiry</button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {products.length===0 && <div className="loading"><p style={{color:'var(--grey)'}}>No products found</p></div>}
      </div></section>

      <InquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultProduct={selectedProduct} />
    </>
  );
}
