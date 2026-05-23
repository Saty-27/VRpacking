import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaArrowRight, FaChevronDown, FaPaperPlane } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-toastify';
import SEOHead from '../components/common/SEOHead';
import api from '../utils/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', companyName: '', email: '', phone: '', productInterested: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [products, setProducts] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    api.get('/products?limit=50').then(r => setProducts(r.data.products || [])).catch(() => {});
    api.get('/faqs/contact').then(r => setFaqs(r.data)).catch(() => {});
    api.get('/settings').then(r => setSettings(r.data)).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) { toast.error('Name and email are required'); return; }
    setSubmitting(true);
    try {
      await api.post('/inquiries', form);
      toast.success('Inquiry submitted successfully! We will contact you soon.');
      setForm({ name: '', companyName: '', email: '', phone: '', productInterested: '', message: '' });
    } catch (err) { toast.error('Failed to submit. Please try again.'); }
    setSubmitting(false);
  };

  const contactInfo = [
    { icon: <FaMapMarkerAlt/>, title: 'Address', value: settings.address || '253/19-A, Opp. Columbia Machine Pvt Ltd, GIDC Industrial Estate, Makarpura, Vadodara - 390010, Gujarat' },
    { icon: <FaPhone/>, title: 'Phone', value: settings.phone || '+91 7384 11611', link: `tel:${(settings.phone || '+917383411611').replace(/\s/g,'')}` },
    { icon: <FaEnvelope/>, title: 'Email', value: settings.email || 'vijay@vrpack.co.in', link: `mailto:${settings.email || 'vijay@vrpack.co.in'}` },
    { icon: <FaClock/>, title: 'Business Hours', value: 'Monday - Saturday: 9:00 AM - 6:00 PM' },
  ];

  return (
    <>
      <SEOHead title="Contact Us - Get a Quote" description="Contact VR Packaging Solutions in Vadodara for VCI products, seaworthy packing, and industrial packaging solutions. Call +91 7384 11611." />
      <section className="page-hero" style={{ backgroundImage: 'linear-gradient(135deg, rgba(17,24,39,0.92), rgba(17,24,39,0.92)), url("/contact_banner.png")' }}><div className="container"><h1>Contact Us</h1><p>Get in Touch with Our Packaging Experts</p><div className="breadcrumb" style={{justifyContent:'center',color:'rgba(255,255,255,0.6)'}}><Link to="/" style={{color:'rgba(255,255,255,0.8)'}}>Home</Link> / <span style={{color:'var(--white)'}}>Contact Us</span></div></div></section>

      <section className="section"><div className="container">
        <div className="grid grid-4" style={{marginBottom:50}}>
          {contactInfo.map((c,i)=>(
            <div key={i} className="card" style={{textAlign:'center'}}>
              <div className="card-icon" style={{margin:'0 auto 12px',color:'var(--orange)'}}>{c.icon}</div>
              <h4>{c.title}</h4>
              {c.link ? <a href={c.link} style={{color:'var(--blue)'}}>{c.value}</a> : <p style={{color:'var(--grey)',fontSize:'0.9rem'}}>{c.value}</p>}
            </div>
          ))}
        </div>

        <div className="grid grid-2" style={{gap:50}}>
          <div>
            <h2 style={{marginBottom:8}}>Send Us an Inquiry</h2>
            <p style={{color:'var(--grey)',marginBottom:30}}>Fill out the form below and our team will get back to you within 24 hours.</p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-2">
                <div className="form-group"><label>Name *</label><input className="form-control" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your Name"/></div>
                <div className="form-group"><label>Company Name</label><input className="form-control" value={form.companyName} onChange={e=>setForm({...form,companyName:e.target.value})} placeholder="Company Name"/></div>
              </div>
              <div className="grid grid-2">
                <div className="form-group"><label>Email *</label><input className="form-control" type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="email@example.com"/></div>
                <div className="form-group"><label>Phone</label><input className="form-control" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+91 XXXXX XXXXX"/></div>
              </div>
              <div className="form-group"><label>Product Interested In</label>
                <select className="form-control" value={form.productInterested} onChange={e=>setForm({...form,productInterested:e.target.value})}>
                  <option value="">Select Product</option>
                  {products.map(p=><option key={p._id} value={p.name}>{p.name}</option>)}
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group"><label>Message</label><textarea className="form-control" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us about your packaging requirements..." rows={5}/></div>
              <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}><FaPaperPlane/> {submitting ? 'Submitting...' : 'Submit Inquiry'}</button>
            </form>
          </div>
          <div>
            <h3 style={{marginBottom:20}}>Quick Contact</h3>
            <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:30}}>
              <a href={`https://wa.me/${settings.whatsapp || '917383411611'}`} target="_blank" rel="noreferrer" className="btn btn-lg" style={{background:'#25d366',color:'#fff',borderColor:'#25d366',justifyContent:'flex-start'}}><FaWhatsapp/> Chat on WhatsApp</a>
              <a href={`tel:${(settings.phone || '+917383411611').replace(/\s/g,'')}`} className="btn btn-secondary btn-lg" style={{justifyContent:'flex-start'}}><FaPhone/> Call Now</a>
              <a href={`mailto:${settings.email || 'vijay@vrpack.co.in'}`} className="btn btn-outline-dark btn-lg" style={{justifyContent:'flex-start'}}><FaEnvelope/> Send Email</a>
            </div>
            {settings.mapIframe && <div style={{borderRadius:'var(--radius-lg)',overflow:'hidden'}} dangerouslySetInnerHTML={{__html:settings.mapIframe}}/>}
          </div>
        </div>
      </div></section>

      {faqs.length>0 && <section className="section section-grey"><div className="container"><div className="section-header"><h2>Frequently Asked Questions</h2></div><div className="faq-list">{faqs.map((f,i)=><div key={f._id} className={`faq-item ${openFaq===i?'open':''}`}><button className="faq-question" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span>{f.question}</span><FaChevronDown className="faq-arrow"/></button><div className="faq-answer"><p>{f.answer}</p></div></div>)}</div></div></section>}
    </>
  );
}
