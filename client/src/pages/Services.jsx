import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShip, FaTruckLoading, FaClipboardCheck, FaGlobeAmericas, FaShieldAlt, FaCogs, FaWarehouse, FaTint, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import SEOHead from '../components/common/SEOHead';
import api, { API_URL } from '../utils/api';

const iconMap = { FaShip, FaTruckLoading, FaClipboardCheck, FaGlobeAmericas, FaShieldAlt, FaCogs, FaWarehouse, FaTint };

export default function Services() {
  const [services, setServices] = useState([]);
  useEffect(() => { api.get('/services').then(r => setServices(r.data)).catch(() => {}); }, []);

  return (
    <>

      <SEOHead title="Services - Seaworthy Packing, Export Packaging" description="Professional packaging services including seaworthy packing, ODC cargo packing, export packaging, and consultancy." />
      <section className="page-hero" style={{ backgroundImage: 'linear-gradient(135deg, rgba(17,24,39,0.92), rgba(17,24,39,0.92)), url("/services_banner.png")' }}><div className="container"><h1>Our Services</h1><p>Complete Industrial Packaging Solutions</p><div className="breadcrumb" style={{justifyContent:'center',color:'rgba(255,255,255,0.6)'}}><Link to="/" style={{color:'rgba(255,255,255,0.8)'}}>Home</Link> / <span style={{color:'var(--white)'}}>Services</span></div></div></section>

      {services.map((s, i) => {
        const Icon = iconMap[s.icon] || FaCogs;
        return (
          <section key={s._id} className={`section ${i % 2 ? 'section-grey' : ''}`}>
            <div className="container">
              <div className={`service-row ${i % 2 ? 'service-row-reverse' : ''}`}>
                <div className="service-row-text">
                  <span className="badge badge-orange">Service</span>
                  <h2 style={{marginTop:12,marginBottom:16}}>{s.name}</h2>
                  <p style={{color:'var(--grey)',lineHeight:1.8,marginBottom:20}}>{s.shortDescription}</p>
                  {s.benefits?.length>0 && <ul style={{marginBottom:24}}>{s.benefits.map((b,j)=><li key={j} style={{display:'flex',gap:8,alignItems:'flex-start',marginBottom:8}}><FaCheckCircle style={{color:'var(--orange)',flexShrink:0,marginTop:4}}/><span>{b}</span></li>)}</ul>}
                  <Link to="/contact-us" className="btn btn-primary">Get Quote <FaArrowRight/></Link>
                </div>
                <div className="service-row-image">
                  {s.image ? (
                    <img 
                      src={s.image.startsWith('http') ? s.image : `${API_URL}${s.image}`} 
                      alt={s.name} 
                      style={{width:'100%',maxWidth:450,height:300,objectFit:'cover',borderRadius:'var(--radius-xl)',boxShadow:'var(--shadow-lg)'}} 
                    />
                  ) : (
                    <div style={{width:300,height:250,background:'linear-gradient(135deg, rgba(26,86,219,0.1), rgba(249,115,22,0.08))',borderRadius:'var(--radius-xl)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <Icon size={80} color="var(--blue)" style={{opacity:0.3}}/>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="section section-gradient"><div className="container" style={{textAlign:'center'}}><h2 style={{color:'var(--white)',marginBottom:16}}>Need Custom Packaging Solutions?</h2><p style={{color:'rgba(255,255,255,0.8)',marginBottom:30}}>Share your packaging requirement and our team will suggest a suitable solution for your needs.</p><Link to="/contact-us" className="btn btn-primary btn-lg">Send Enquiry <FaArrowRight/></Link></div></section>
    </>
  );
}
