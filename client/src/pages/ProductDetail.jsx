import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaArrowRight, FaPhone, FaBoxOpen, FaChevronDown, FaEnvelope } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SEOHead from '../components/common/SEOHead';
import InquiryModal from '../components/common/InquiryModal';
import api, { API_URL } from '../utils/api';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(1);
  const [parsedSections, setParsedSections] = useState([]);

  useEffect(() => {
    setLoading(true);
    api.get(`/products/${slug}`).then(r => { 
      setProduct(r.data); 
      if (r.data && r.data.longDescription) {
        const sections = [];
        const regex = /<h2>(?:(\d+)\.\s*)?(.*?)<\/h2>([\s\S]*?)(?=(?:<h2>|$))/g;
        let match;
        while ((match = regex.exec(r.data.longDescription)) !== null) {
          sections.push({
            index: match[1] ? parseInt(match[1]) : sections.length + 1,
            title: match[2].trim(),
            content: match[3].trim()
          });
        }
        setParsedSections(sections);
        setActiveSection(1);
      }
      setLoading(false); 
    }).catch(() => setLoading(false));
    api.get('/faqs/products').then(r => setFaqs(r.data)).catch(() => {});
  }, [slug]);

  if (loading) return <div className="loading" style={{minHeight:'60vh'}}><div className="spinner"/></div>;
  if (!product) return <div className="page-hero"><div className="container"><h1>Product Not Found</h1><Link to="/products" className="btn btn-primary" style={{marginTop:20}}>Back to Products</Link></div></div>;

  return (
    <>
      <SEOHead title={product.metaTitle || product.name} description={product.metaDescription || product.shortDescription} keywords={product.keywords} />
      <section className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1>{product.name}</h1>
            <div className="breadcrumb" style={{justifyContent:'center',color:'rgba(255,255,255,0.6)'}}>
              <Link to="/" style={{color:'rgba(255,255,255,0.8)'}}>Home</Link> / <Link to="/products" style={{color:'rgba(255,255,255,0.8)'}}>Products</Link> / <span style={{color:'var(--white)'}}>{product.name}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section"><div className="container">
        <div className="product-detail-grid">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="product-detail-image-wrapper">
            {product.images && product.images[0] ? <img src={product.images[0].startsWith('http') ? product.images[0] : `${API_URL}${product.images[0]}`} alt={product.name} /> : <FaBoxOpen size={80} color="var(--blue)"/>}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="product-detail-info-wrapper">
            <span className="badge badge-blue">{product.category?.name || 'Product'}</span>
            <h2 style={{marginTop:12,marginBottom:16}}>{product.name}</h2>
            <p style={{color:'var(--grey)',lineHeight:1.8,marginBottom:24}}>{product.shortDescription}</p>
            {product.features?.length>0 && (<><h4 style={{marginBottom:12}}>Key Features</h4><ul style={{marginBottom:24}}>{product.features.map((f,i)=><li key={i} style={{display:'flex',gap:8,alignItems:'center',marginBottom:8,color:'var(--grey-dark)'}}><FaCheckCircle style={{color:'var(--orange)',flexShrink:0}}/>{f}</li>)}</ul></>)}
            <div className="product-detail-buttons">
              <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-lg"><FaEnvelope/> Get Quote</button>
              <a href="https://wa.me/917383411611" target="_blank" rel="noreferrer" className="btn btn-lg" style={{background:'#25d366',color:'#fff',borderColor:'#25d366'}}><FaWhatsapp/> WhatsApp</a>
              <a href="tel:+917383411611" className="btn btn-secondary btn-lg"><FaPhone/> Call Now</a>
            </div>
          </motion.div>
        </div>
      </div></section>

      {product.longDescription && parsedSections.length > 0 && (
        <section className="section section-grey" style={{ overflow: 'visible' }}>
          <div className="container">
            <div className="section-header">
              <h2>Technical Documentation</h2>
              <p className="subtitle">Detailed specifications, chemical composition, operational integration, and standards.</p>
            </div>
            
            <div className="product-doc-layout">
              <aside className="product-doc-sidebar">
                <h4>Document Index</h4>
                <div className="toc-list">
                  {parsedSections.map((sec) => (
                    <button
                      key={sec.index}
                      className={`toc-item ${activeSection === sec.index ? 'active' : ''}`}
                      onClick={() => {
                        setActiveSection(sec.index);
                        document.querySelector('.product-doc-layout')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <span className="toc-num">{sec.index}</span>
                      <span className="toc-title">{sec.title.replace(/^\d+\.\s*/, '')}</span>
                    </button>
                  ))}
                </div>
              </aside>

              <div className="product-doc-content">
                {parsedSections.map((sec) => (
                  <div
                    key={sec.index}
                    className="doc-section-card"
                    style={{ display: activeSection === sec.index ? 'block' : 'none' }}
                  >
                    <h2>
                      <span style={{
                        background: 'var(--orange)',
                        color: 'var(--white)',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        marginRight: '8px'
                      }}>
                        {sec.index}
                      </span>
                      {sec.title.replace(/^\d+\.\s*/, '')}
                    </h2>
                    
                    <div dangerouslySetInnerHTML={{ __html: sec.content }} />
                    
                    <div className="doc-pagination">
                      {sec.index > 1 ? (
                        <button
                          className="btn btn-outline-dark btn-sm"
                          onClick={() => {
                            setActiveSection(sec.index - 1);
                            document.querySelector('.product-doc-layout')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          &larr; Previous Section
                        </button>
                      ) : (
                        <div />
                      )}
                      
                      {sec.index < parsedSections.length ? (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            setActiveSection(sec.index + 1);
                            document.querySelector('.product-doc-layout')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          Next Section &rarr;
                        </button>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {product.applications?.length>0 && <section className="section"><div className="container"><div className="section-header"><h2>Applications</h2></div><div className="grid grid-4">{product.applications.map((a,i)=><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} key={i} className="card glass" style={{textAlign:'center'}}><FaCheckCircle style={{color:'var(--blue)',fontSize:'1.5rem',marginBottom:10}}/><h4 style={{fontSize:'1rem'}}>{a}</h4></motion.div>)}</div></div></section>}

      {product.benefits?.length>0 && <section className="section section-grey"><div className="container"><div className="section-header"><h2>Benefits</h2></div><div className="grid grid-2">{product.benefits.map((b,i)=><div key={i} style={{display:'flex',gap:10,alignItems:'center'}}><FaCheckCircle style={{color:'var(--orange)'}}/><span>{b}</span></div>)}</div></div></section>}

      {product.relatedProducts?.length>0 && <section className="section"><div className="container"><div className="section-header"><h2>Related Products</h2></div><div className="grid grid-3">{product.relatedProducts.map(r=><div key={r._id} className="card product-card glass"><div className="product-image">{r.images && r.images[0] ? <img src={r.images[0]} alt={r.name} /> : <FaBoxOpen size={30} color="var(--blue)"/>}</div><div className="product-content"><h3>{r.name}</h3><Link to={`/products/${r.slug}`} className="btn btn-primary btn-sm">View Details</Link></div></div>)}</div></div></section>}

      {faqs.length>0 && <section className="section section-grey"><div className="container"><div className="section-header"><h2>Product FAQs</h2></div><div className="faq-list">{faqs.map((f,i)=><div key={f._id} className={`faq-item ${openFaq===i?'open':''}`}><button className="faq-question" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span>{f.question}</span><FaChevronDown className="faq-arrow"/></button><div className="faq-answer"><p>{f.answer}</p></div></div>)}</div></div></section>}

      <section className="section section-gradient"><div className="container" style={{textAlign:'center'}}><h2 style={{color:'var(--white)',marginBottom:16}}>Interested in {product.name}?</h2><p style={{color:'rgba(255,255,255,0.8)',marginBottom:30}}>Share your requirement and we will get back with suitable specifications and availability.</p><button onClick={() => setModalOpen(true)} className="btn btn-primary btn-lg">Send Enquiry <FaArrowRight/></button></div></section>

      <InquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultProduct={product.name} />
    </>
  );
}
