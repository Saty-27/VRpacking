import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import api from '../utils/api';

export default function Sitemap() {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    api.get('/products?limit=50').then(r => setProducts(r.data.products || [])).catch(() => {});
    api.get('/blogs?limit=50').then(r => setBlogs(r.data.blogs || [])).catch(() => {});
  }, []);

  return (<>
    <SEOHead title="Sitemap" description="Complete sitemap of VR Packaging Solutions website." />
    <section className="page-hero"><div className="container"><h1>Sitemap</h1></div></section>
    <section className="section"><div className="container">
      <div className="grid grid-3">
        <div><h3>Main Pages</h3><ul style={{marginTop:16}}>{['/','/about-us','/products','/services','/gallery','/blog','/contact-us','/privacy-policy','/terms-and-conditions'].map(p=><li key={p} style={{marginBottom:8}}><Link to={p} style={{color:'var(--blue)'}}>{p==='/'?'Home':p.replace(/\//g,'').replace(/-/g,' ').replace(/\b\w/g,l=>l.toUpperCase())}</Link></li>)}</ul></div>
        <div><h3>Products</h3><ul style={{marginTop:16}}>{products.map(p=><li key={p._id} style={{marginBottom:8}}><Link to={`/products/${p.slug}`} style={{color:'var(--blue)'}}>{p.name}</Link></li>)}</ul></div>
        <div><h3>Blog Posts</h3><ul style={{marginTop:16}}>{blogs.map(b=><li key={b._id} style={{marginBottom:8}}><Link to={`/blog/${b.slug}`} style={{color:'var(--blue)'}}>{b.title}</Link></li>)}</ul></div>
      </div>
    </div></section>
  </>);
}
