import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendar, FaUser, FaTag, FaArrowRight } from 'react-icons/fa';
import SEOHead from '../components/common/SEOHead';
import api, { API_URL } from '../utils/api';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/blogs/${slug}`).then(r => { setBlog(r.data); setLoading(false);
      api.get('/blogs', { params: { category: r.data.category, limit: 3 } }).then(r2 => setRelated((r2.data.blogs || []).filter(b => b.slug !== slug))).catch(() => {});
    }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="loading" style={{minHeight:'60vh'}}><div className="spinner"/></div>;
  if (!blog) return <div className="page-hero"><div className="container"><h1>Blog Not Found</h1><Link to="/blog" className="btn btn-primary" style={{marginTop:20}}>Back to Blog</Link></div></div>;

  const schema = { "@context": "https://schema.org", "@type": "BlogPosting", headline: blog.title, author: { "@type": "Person", name: blog.author }, datePublished: blog.createdAt, description: blog.excerpt };

  return (
    <>
      <SEOHead title={blog.metaTitle || blog.title} description={blog.metaDescription || blog.excerpt} keywords={blog.tags?.join(', ')} schema={schema} />
      <section className="page-hero" style={{ backgroundImage: `linear-gradient(135deg, rgba(17,24,39,0.95), rgba(17,24,39,0.95)), url(${blog.featuredImage ? (blog.featuredImage.startsWith('http') ? blog.featuredImage : API_URL + blog.featuredImage) : '/world_map_bg.jpg'})` }}><div className="container"><h1>{blog.title}</h1><div style={{display:'flex',gap:20,justifyContent:'center',color:'rgba(255,255,255,0.7)',fontSize:'0.9rem',marginTop:12}}><span style={{display:'flex',alignItems:'center',gap:6}}><FaUser/>{blog.author}</span><span style={{display:'flex',alignItems:'center',gap:6}}><FaTag/>{blog.category}</span></div><div className="breadcrumb" style={{justifyContent:'center',color:'rgba(255,255,255,0.6)'}}><Link to="/" style={{color:'rgba(255,255,255,0.8)'}}>Home</Link> / <Link to="/blog" style={{color:'rgba(255,255,255,0.8)'}}>Blog</Link> / <span style={{color:'var(--white)'}}>{blog.title}</span></div></div></section>

      <section className="section"><div className="container" style={{maxWidth:800,margin:'0 auto'}}>
        {blog.featuredImage && (
          <div style={{ width: '100%', height: 'auto', maxHeight: 400, borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 30, boxShadow: 'var(--shadow-md)' }}>
            <img 
              src={blog.featuredImage.startsWith('http') ? blog.featuredImage : `${API_URL}${blog.featuredImage}`} 
              alt={blog.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', maxHeight: 400 }} 
            />
          </div>
        )}
        <div className="blog-body" dangerouslySetInnerHTML={{__html: blog.content}} style={{lineHeight:1.9,color:'var(--grey-dark)',fontSize:'1.05rem'}}/>
        {blog.tags?.length>0 && <div style={{marginTop:30,display:'flex',gap:8,flexWrap:'wrap'}}>{blog.tags.map(t=><span key={t} className="badge badge-blue">{t}</span>)}</div>}
      </div></section>

      {related.length>0 && <section className="section section-grey"><div className="container"><div className="section-header"><h2>Related Articles</h2></div><div className="grid grid-3">{related.map(b=><div key={b._id} className="card blog-card"><div className="blog-content"><span className="badge badge-blue">{b.category}</span><h4 style={{marginTop:10}}>{b.title}</h4><p>{b.excerpt?.substring(0,100)}...</p><Link to={`/blog/${b.slug}`} className="blog-link">Read More <FaArrowRight/></Link></div></div>)}</div></div></section>}

      <section className="section section-gradient"><div className="container" style={{textAlign:'center'}}><h2 style={{color:'var(--white)',marginBottom:16}}>Need This Packaging Solution?</h2><p style={{color:'rgba(255,255,255,0.8)',marginBottom:30}}>Share your requirement and VR Packaging Solutions will get back with a suitable solution.</p><Link to="/contact-us" className="btn btn-primary btn-lg">Contact VR Packaging Solutions <FaArrowRight /></Link></div></section>
    </>
  );
}
