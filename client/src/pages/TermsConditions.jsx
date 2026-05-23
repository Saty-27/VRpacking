import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';

export default function TermsConditions() {
  return (<>
    <SEOHead title="Terms & Conditions" description="Read the terms and conditions of VR Packaging Solutions." />
    <section className="page-hero"><div className="container"><h1>Terms & Conditions</h1><div className="breadcrumb" style={{justifyContent:'center',color:'rgba(255,255,255,0.6)'}}><Link to="/" style={{color:'rgba(255,255,255,0.8)'}}>Home</Link> / <span style={{color:'var(--white)'}}>Terms & Conditions</span></div></div></section>
    <section className="section"><div className="container" style={{maxWidth:800,margin:'0 auto'}}>
      <h2>Terms & Conditions</h2><p style={{color:'var(--grey)',marginTop:16,lineHeight:1.8}}>By accessing and using the VR Packaging Solutions website, you accept and agree to be bound by these terms.</p>
      <h3 style={{marginTop:30}}>Services</h3><p style={{color:'var(--grey)',lineHeight:1.8}}>VR Packaging Solutions provides industrial packaging products and services. All product specifications and pricing are subject to change without notice.</p>
      <h3 style={{marginTop:30}}>Intellectual Property</h3><p style={{color:'var(--grey)',lineHeight:1.8}}>All content on this website including text, images, logos, and designs are the intellectual property of VR Packaging Solutions.</p>
      <h3 style={{marginTop:30}}>Limitation of Liability</h3><p style={{color:'var(--grey)',lineHeight:1.8}}>VR Packaging Solutions shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website.</p>
      <h3 style={{marginTop:30}}>Contact</h3><p style={{color:'var(--grey)',lineHeight:1.8}}>For any questions regarding these terms, contact us at vijay@vrpack.co.in.</p>
    </div></section>
  </>);
}
