import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';

export default function PrivacyPolicy() {
  return (<>
    <SEOHead title="Privacy Policy" description="Read the privacy policy of VR Packaging Solutions." />
    <section className="page-hero"><div className="container"><h1>Privacy Policy</h1><div className="breadcrumb" style={{justifyContent:'center',color:'rgba(255,255,255,0.6)'}}><Link to="/" style={{color:'rgba(255,255,255,0.8)'}}>Home</Link> / <span style={{color:'var(--white)'}}>Privacy Policy</span></div></div></section>
    <section className="section"><div className="container" style={{maxWidth:800,margin:'0 auto'}}>
      <h2>Privacy Policy</h2><p style={{color:'var(--grey)',marginTop:16,lineHeight:1.8}}>VR Packaging Solutions ("us", "we", or "our") operates the www.vrpack.co.in website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our website.</p>
      <h3 style={{marginTop:30}}>Information Collection</h3><p style={{color:'var(--grey)',lineHeight:1.8}}>We collect information you provide through our contact form including name, email, phone number, company name, and message content. This information is used solely to respond to your inquiries and provide our services.</p>
      <h3 style={{marginTop:30}}>Data Usage</h3><p style={{color:'var(--grey)',lineHeight:1.8}}>Your personal data is used to respond to inquiries, provide quotations, send relevant product information, and improve our services. We do not sell or share your data with third parties.</p>
      <h3 style={{marginTop:30}}>Cookies</h3><p style={{color:'var(--grey)',lineHeight:1.8}}>Our website may use cookies to enhance user experience. You can disable cookies in your browser settings.</p>
      <h3 style={{marginTop:30}}>Contact</h3><p style={{color:'var(--grey)',lineHeight:1.8}}>For privacy-related queries, contact us at vijay@vrpack.co.in or call +91 7384 11611.</p>
    </div></section>
  </>);
}
