import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';

export default function Sitemap() {
  const currentUrl = 'https://www.vrpack.co.in/sitemap';

  return (
    <>
      <SEOHead 
        title="Sitemap - VR Packaging Solutions Vadodara" 
        description="Navigate all public, priority services, VCI products, moisture control, and blog pages on the VR Packaging Solutions website." 
        canonical={currentUrl}
      />
      
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)', padding: '60px 0' }}>
        <div className="container">
          <h1>Sitemap</h1>
          <p>Complete navigation directory for our products and services</p>
          <div className="breadcrumb" style={{ justifyContent: 'center', color: 'rgba(255,255,255,0.6)' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link> / <span style={{ color: 'var(--white)' }}>Sitemap</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-3" style={{ gap: '40px', alignItems: 'flex-start' }}>
            
            {/* Column 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div>
                <h3 style={{ borderBottom: '2px solid var(--orange)', paddingBottom: '8px', marginBottom: '16px', color: 'var(--navy)' }}>Main Pages</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '10px' }}><Link to="/" style={{ color: 'var(--blue)', fontWeight: 500 }}>Home</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/about-us" style={{ color: 'var(--blue)', fontWeight: 500 }}>About Us</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/products" style={{ color: 'var(--blue)', fontWeight: 500 }}>Products</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/services" style={{ color: 'var(--blue)', fontWeight: 500 }}>Services</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/gallery" style={{ color: 'var(--blue)', fontWeight: 500 }}>Gallery</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/blog" style={{ color: 'var(--blue)', fontWeight: 500 }}>Blog</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/contact-us" style={{ color: 'var(--blue)', fontWeight: 500 }}>Contact Us</Link></li>
                </ul>
              </div>

              <div>
                <h3 style={{ borderBottom: '2px solid var(--orange)', paddingBottom: '8px', marginBottom: '16px', color: 'var(--navy)' }}>VCI Products</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '10px' }}><Link to="/vci-film-roll-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem' }}>VCI Film Roll in Vadodara</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/vci-paper-supplier-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem' }}>VCI Paper Supplier in Vadodara</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/vci-bags-manufacturer-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem' }}>VCI Bags Manufacturer in Vadodara</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/vci-oil-supplier-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem' }}>VCI Oil Supplier in Vadodara</Link></li>
                </ul>
              </div>

              <div>
                <h3 style={{ borderBottom: '2px solid var(--orange)', paddingBottom: '8px', marginBottom: '16px', color: 'var(--navy)' }}>Moisture Protection</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '10px' }}><Link to="/desiccant-supplier-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem' }}>Desiccant Supplier in Vadodara</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/humidity-indicator-card-supplier-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem' }}>Humidity Indicator Card Supplier in Vadodara</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/aluminium-barrier-foil-rolls-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem' }}>Aluminium Barrier Foil Rolls in Vadodara</Link></li>
                </ul>
              </div>
            </div>

            {/* Column 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div>
                <h3 style={{ borderBottom: '2px solid var(--orange)', paddingBottom: '8px', marginBottom: '16px', color: 'var(--navy)' }}>Priority Services</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '10px' }}><Link to="/seaworthy-packing-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem', fontWeight: 500 }}>Seaworthy Packing in Vadodara</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/vci-packaging-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem', fontWeight: 500 }}>VCI Packaging in Vadodara</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/vci-packaging-manufacturer-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem', fontWeight: 500 }}>VCI Packaging Manufacturer in Vadodara</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/export-packaging-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem', fontWeight: 500 }}>Export Packaging in Vadodara</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/industrial-packaging-solutions-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem', fontWeight: 500 }}>Industrial Packaging Solutions in Vadodara</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/aluminium-barrier-foil-packing-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem', fontWeight: 500 }}>Aluminium Barrier Foil Packing in Vadodara</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/thermo-shrink-packing-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem', fontWeight: 500 }}>Thermo Shrink Packing in Vadodara</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/odc-cargo-packing-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem', fontWeight: 500 }}>ODC Cargo Packing in Vadodara</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/packaging-consultancy-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem', fontWeight: 500 }}>Packaging Consultancy in Vadodara</Link></li>
                </ul>
              </div>

              <div>
                <h3 style={{ borderBottom: '2px solid var(--orange)', paddingBottom: '8px', marginBottom: '16px', color: 'var(--navy)' }}>Protective Covers</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '10px' }}><Link to="/silpaulin-cover-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem' }}>Silpaulin Cover in Vadodara</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/tarpaulin-rolls-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem' }}>Tarpaulin Rolls in Vadodara</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/heavy-duty-protective-cover-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem' }}>Heavy Duty Protective Cover in Vadodara</Link></li>
                </ul>
              </div>
            </div>

            {/* Column 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div>
                <h3 style={{ borderBottom: '2px solid var(--orange)', paddingBottom: '8px', marginBottom: '16px', color: 'var(--navy)' }}>Industrial Bags and Liners</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '10px' }}><Link to="/ld-hm-liners-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem' }}>LD/HM Liners in Vadodara</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/hdpe-roll-supplier-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem' }}>HDPE Roll Supplier in Vadodara</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/pp-tubing-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem' }}>PP Tubing in Vadodara</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/heavy-duty-liner-bags-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem' }}>Heavy Duty Liner Bags in Vadodara</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/valve-type-ld-bags-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.95rem' }}>Valve Type LD Bags in Vadodara</Link></li>
                </ul>
              </div>

              <div>
                <h3 style={{ borderBottom: '2px solid var(--orange)', paddingBottom: '8px', marginBottom: '16px', color: 'var(--navy)' }}>Blog Guides</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '10px' }}>
                    <Link to="/blog/seaworthy-packing-in-vadodara-complete-guide" style={{ color: 'var(--blue)', fontSize: '0.9rem', lineHeight: 1.4, display: 'block' }}>
                      Seaworthy Packing in Vadodara Complete Guide
                    </Link>
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <Link to="/blog/vci-packaging-for-rust-prevention" style={{ color: 'var(--blue)', fontSize: '0.9rem', lineHeight: 1.4, display: 'block' }}>
                      VCI Packaging for Rust Prevention
                    </Link>
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <Link to="/blog/export-packaging-guide-for-manufacturers-in-vadodara" style={{ color: 'var(--blue)', fontSize: '0.9rem', lineHeight: 1.4, display: 'block' }}>
                      Export Packaging Guide for Manufacturers in Vadodara
                    </Link>
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <Link to="/blog/aluminium-barrier-foil-packing-for-moisture-protection" style={{ color: 'var(--blue)', fontSize: '0.9rem', lineHeight: 1.4, display: 'block' }}>
                      Aluminium Barrier Foil Packing for Moisture Protection
                    </Link>
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <Link to="/blog/how-to-protect-metal-parts-from-corrosion-during-shipping" style={{ color: 'var(--blue)', fontSize: '0.9rem', lineHeight: 1.4, display: 'block' }}>
                      How to Protect Metal Parts from Corrosion During Shipping
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
