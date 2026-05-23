require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Service = require('../models/Service');
const Blog = require('../models/Blog');
const FAQ = require('../models/FAQ');
const Testimonial = require('../models/Testimonial');
const Page = require('../models/Page');
const Section = require('../models/Section');
const Gallery = require('../models/Gallery');

async function seedContent() {
  await connectDB();

  // Pages
  await Page.deleteMany({});
  const pgs = [
    { pageName: 'Home', slug: '/', metaTitle: 'VR Packaging Solutions - VCI & Seaworthy Packaging Manufacturer Vadodara', metaDescription: 'VR Packaging Solutions is a leading manufacturer of VCI products and seaworthy packaging solutions in Vadodara, Gujarat. Export packaging, corrosion protection, industrial packaging.' },
    { pageName: 'About Us', slug: '/about-us', metaTitle: 'About VR Packaging Solutions - Industrial Packaging Experts Vadodara', metaDescription: 'Learn about VR Packaging Solutions, a trusted VCI and seaworthy packaging manufacturer in Vadodara, Gujarat.' },
    { pageName: 'Products', slug: '/products', metaTitle: 'Products - VCI Film, Barrier Foil, Packaging Solutions', metaDescription: 'Explore our range of VCI products, aluminium barrier foils, protective covers, and industrial packaging solutions.' },
    { pageName: 'Services', slug: '/services', metaTitle: 'Services - Seaworthy Packing, Export Packaging, Consultancy', metaDescription: 'Professional packaging services including seaworthy packing, ODC cargo packing, export packaging, and consultancy.' },
    { pageName: 'Gallery', slug: '/gallery', metaTitle: 'Gallery - VR Packaging Solutions Work Portfolio', metaDescription: 'View our packaging projects, factory processes, and product gallery.' },
    { pageName: 'Blog', slug: '/blog', metaTitle: 'Blog - Packaging Industry Insights & Tips', metaDescription: 'Read our latest articles on VCI packaging, seaworthy packing, export solutions, and industrial packaging best practices.' },
    { pageName: 'Contact Us', slug: '/contact-us', metaTitle: 'Contact VR Packaging Solutions - Get a Quote', metaDescription: 'Contact VR Packaging Solutions in Vadodara for VCI products, seaworthy packing, and industrial packaging solutions.' },
    { pageName: 'Privacy Policy', slug: '/privacy-policy', metaTitle: 'Privacy Policy - VR Packaging Solutions', metaDescription: 'Read our privacy policy.' },
    { pageName: 'Terms & Conditions', slug: '/terms-and-conditions', metaTitle: 'Terms & Conditions - VR Packaging Solutions', metaDescription: 'Read our terms and conditions.' },
  ];
  await Page.insertMany(pgs);
  console.log('✅ Pages seeded');

  // Services
  await Service.deleteMany({});
  const svcs = [
    { name: 'Seaworthy Packing', icon: 'FaShip', image: '/uploads/service_seaworthy_packing.png', shortDescription: 'Complete seaworthy packaging solutions for export cargo, ensuring safe transit across oceans with corrosion and moisture protection.', longDescription: '<p>Our seaworthy packing services ensure your cargo arrives safely at international destinations. We use multi-layer protection including VCI films, desiccants, aluminium barrier foils, and wooden crating to protect against corrosion, moisture, and physical damage during sea transit.</p>', benefits: ['International standard compliance', 'Multi-layer corrosion protection', 'Moisture barrier systems', 'Custom-engineered solutions'], order: 1 },
    { name: 'ODC & Cargo Project Packing', icon: 'FaTruckLoading', image: '/uploads/service_odc_packing.png', shortDescription: 'Specialized packing for over-dimensional cargo, heavy machinery, and project cargo shipments.', longDescription: '<p>We handle over-dimensional and heavy cargo with engineered packing solutions designed for safe handling and transport of large industrial equipment.</p>', benefits: ['Custom crating & bracing', 'Load securing', 'Weather protection', 'Heavy lift coordination'], order: 2 },
    { name: 'Packing Consultancy', icon: 'FaClipboardCheck', image: '/uploads/service_consultancy.png', shortDescription: 'Expert packaging consultancy to optimize your packaging strategy and reduce transit damages.', longDescription: '<p>Our consultancy services help businesses optimize their packaging processes, reduce material waste, and ensure compliance with international shipping standards.</p>', benefits: ['Cost optimization', 'Material selection guidance', 'Compliance advisory', 'Process improvement'], order: 3 },
    { name: 'Export Packaging', icon: 'FaGlobeAmericas', image: '/uploads/service_export_packaging.png', shortDescription: 'End-to-end export packaging solutions designed for safe international transit of industrial goods.', longDescription: '<p>We provide comprehensive export packaging that meets international standards, ensuring your products reach global destinations safely.</p>', benefits: ['ISPM-15 compliant', 'Documentation support', 'Multi-modal solutions', 'Country-specific compliance'], order: 4 },
    { name: 'Corrosion Protection Packaging', icon: 'FaShieldAlt', image: '/uploads/service_corrosion_protection.png', shortDescription: 'Advanced VCI-based corrosion protection packaging for metal components and industrial goods.', longDescription: '<p>Our corrosion protection solutions use VCI technology to protect ferrous and non-ferrous metals during storage and transit.</p>', benefits: ['VCI film wrapping', 'Desiccant integration', 'Humidity monitoring', 'Long-term storage solutions'], order: 5 },
    { name: 'Custom Industrial Packaging', icon: 'FaCogs', image: '/uploads/service_custom_packaging.png', shortDescription: 'Tailor-made packaging solutions designed for your specific industrial requirements.', longDescription: '<p>Every industry has unique packaging challenges. We design and manufacture custom packaging solutions that perfectly fit your products and processes.</p>', benefits: ['Product-specific design', 'Prototype development', 'Volume production', 'Quality testing'], order: 6 },
    { name: 'Heavy Duty Protective Covering', icon: 'FaWarehouse', image: '/uploads/service_heavy_duty_covering.png', shortDescription: 'Industrial-grade protective covers for outdoor storage, construction, and transit applications.', longDescription: '<p>Our heavy-duty covers and tarpaulins protect valuable assets from weather, dust, and physical damage in outdoor and transit environments.</p>', benefits: ['UV resistant', 'Waterproof', 'Custom fabrication', 'Durable materials'], order: 7 },
    { name: 'Moisture Protection Solutions', icon: 'FaTint', image: '/uploads/service_moisture_protection.png', shortDescription: 'Comprehensive moisture protection using desiccants, barrier films, and humidity monitoring systems.', longDescription: '<p>Moisture is the enemy of many industrial products. Our solutions combine desiccants, barrier films, and humidity indicators for complete moisture control.</p>', benefits: ['Desiccant systems', 'Barrier film wrapping', 'Humidity monitoring', 'Custom solutions'], order: 8 },
  ];
  for (const s of svcs) {
    await Service.create(s);
  }
  console.log('✅ Services seeded');

  // Blogs
  await Blog.deleteMany({});
  const blogs = [
    { title: 'What is VCI Packaging and Why Industries Need It?', category: 'VCI Products', excerpt: 'Learn about Volatile Corrosion Inhibitor (VCI) packaging technology and how it protects metal components from corrosion during storage and transit.', content: '<h2>Understanding VCI Packaging</h2><p>VCI (Volatile Corrosion Inhibitor) packaging is a revolutionary technology that provides active corrosion protection for metal parts. VCI molecules vaporize from the packaging material and form an invisible protective layer on metal surfaces, preventing oxidation and corrosion.</p><h2>Why Industries Need VCI Packaging</h2><p>Industries dealing with metal components face significant losses due to corrosion during storage and shipping. VCI packaging eliminates this risk by providing continuous protection without the need for messy oils or greases.</p><h2>Applications in Vadodara Industries</h2><p>Vadodara\'s thriving industrial sector, particularly in GIDC Makarpura, benefits greatly from VCI packaging solutions for automotive parts, machinery components, and export cargo.</p>', featuredImage: '/uploads/vci_film_roll.png' },
    { title: 'Benefits of Seaworthy Packing for Export Cargo', category: 'Export Packaging', excerpt: 'Discover why seaworthy packing is essential for international shipments and how it protects your valuable cargo during ocean transit.', content: '<h2>What is Seaworthy Packing?</h2><p>Seaworthy packing is a specialized packaging method designed to protect goods during ocean freight. It involves multiple layers of protection against moisture, corrosion, vibration, and physical impact.</p><h2>Key Benefits</h2><p>Proper seaworthy packing reduces damage claims, ensures compliance with international shipping regulations, and protects your business reputation with overseas clients.</p>', featuredImage: '/uploads/seaworthy_packing.png' },
    { title: 'Best Industrial Packaging Solutions in Vadodara, Gujarat', category: 'Industrial Packaging', excerpt: 'Explore the top industrial packaging solutions available in Vadodara for manufacturing, engineering, and export businesses.', content: '<h2>Vadodara - An Industrial Packaging Hub</h2><p>Vadodara, with its strong industrial base in GIDC Makarpura and surrounding areas, is home to leading packaging solution providers. VR Packaging Solutions stands out with comprehensive VCI and seaworthy packaging services.</p>', featuredImage: '/uploads/hdpe_roll.png' },
    { title: 'How Aluminium Barrier Foil Protects Industrial Goods', category: 'Barrier Foils', excerpt: 'Understanding the science behind aluminium barrier foil and its critical role in protecting sensitive industrial components.', content: '<h2>Aluminium Barrier Foil Technology</h2><p>Aluminium barrier foil provides an impenetrable barrier against moisture, oxygen, and light. This multi-layer laminate is essential for protecting sensitive electronics, defence equipment, and precision machinery during long-term storage and transit.</p>', featuredImage: '/uploads/aluminium_barrier_foil.png' },
    { title: 'Importance of Humidity Indicators in Export Packaging', category: 'VCI Products', excerpt: 'Learn how humidity indicator cards help monitor moisture levels and prevent damage in sealed export packages.', content: '<h2>What Are Humidity Indicators?</h2><p>Humidity indicator cards (HICs) are simple but essential tools that provide visual indication of moisture levels inside sealed packaging. They use moisture-sensitive chemicals that change color based on relative humidity.</p>', featuredImage: '/uploads/humidity_indicator.png' },
  ];
  for (const b of blogs) {
    await Blog.create(b);
  }
  console.log('✅ Blogs seeded');

  // FAQs
  await FAQ.deleteMany({});
  const faqs = [
    { page: 'home', question: 'What is VCI packaging?', answer: 'VCI (Volatile Corrosion Inhibitor) packaging uses special films and materials that release corrosion-inhibiting molecules to protect metal components from rust and corrosion during storage and transit.', order: 1 },
    { page: 'home', question: 'Why is seaworthy packing important?', answer: 'Seaworthy packing protects goods from moisture, corrosion, vibration, and physical damage during ocean freight, ensuring cargo arrives safely at international destinations.', order: 2 },
    { page: 'home', question: 'Do you provide export packaging in Vadodara?', answer: 'Yes, VR Packaging Solutions provides comprehensive export packaging solutions from our facility in GIDC Makarpura, Vadodara, Gujarat.', order: 3 },
    { page: 'home', question: 'What industries use aluminium barrier foil?', answer: 'Aluminium barrier foil is used in defence, aerospace, electronics, automotive, pharmaceutical, and heavy machinery industries for moisture and corrosion protection.', order: 4 },
    { page: 'home', question: 'Do you provide custom packaging solutions?', answer: 'Yes, we specialize in custom-engineered packaging solutions tailored to your specific product dimensions, protection requirements, and industry standards.', order: 5 },
    { page: 'products', question: 'What types of VCI products do you offer?', answer: 'We offer VCI films, VCI bags, VCI papers, VCI emitters, and VCI oils for comprehensive corrosion protection of ferrous and non-ferrous metals.', order: 1 },
    { page: 'products', question: 'Can you provide custom-sized packaging materials?', answer: 'Yes, all our products can be customized in terms of size, thickness, material composition, and printing as per your requirements.', order: 2 },
    { page: 'contact', question: 'What are your business hours?', answer: 'We operate Monday to Saturday, 9:00 AM to 6:00 PM IST. You can reach us at +91 7384 11611 during business hours.', order: 1 },
    { page: 'contact', question: 'Do you provide samples before bulk orders?', answer: 'Yes, we provide product samples for evaluation before committing to bulk orders. Contact us to request samples.', order: 2 },
  ];
  await FAQ.insertMany(faqs);
  console.log('✅ FAQs seeded');

  // Testimonials
  await Testimonial.deleteMany({});
  await Testimonial.insertMany([
    { clientName: 'Rajesh Patel', companyName: 'Gujarat Engineering Works', review: 'VR Packaging Solutions provided excellent VCI packaging for our export machinery. Zero corrosion issues since we started using their products.', rating: 5 },
    { clientName: 'Amit Shah', companyName: 'Vadodara Auto Components', review: 'Their seaworthy packing services are top-notch. Our overseas clients have been very satisfied with the packaging quality.', rating: 5 },
    { clientName: 'Priya Desai', companyName: 'Makarpura Electronics', review: 'Reliable aluminium barrier foil rolls and excellent customer service. Highly recommended for export packaging needs.', rating: 4 },
    { clientName: 'Suresh Kumar', companyName: 'Heavy Machinery Exports India', review: 'Outstanding ODC cargo packing. They handled our oversized equipment export with great professionalism.', rating: 5 },
    { clientName: 'Meena Joshi', companyName: 'Chemical Industries Gujarat', review: 'Cost-effective packaging solutions with great attention to quality. Their silpaulin covers are very durable.', rating: 4 },
  ]);
  console.log('✅ Testimonials seeded');

  // Gallery
  await Gallery.deleteMany({});
  const galleryItems = [
    {
      title: 'VCI Film Roll Packing',
      category: 'VCI Products',
      caption: 'Advanced VCI film rolls protecting auto components from rust during long-term storage.',
      order: 1,
      image: '/uploads/vci_film_roll.png'
    },
    {
      title: 'VCI Pallet Protection',
      category: 'VCI Products',
      caption: 'Heavy machinery components loaded in customized VCI protective outer crates.',
      order: 2,
      image: '/uploads/heavy_duty_protective_cover.png'
    },
    {
      title: 'Seaworthy Container Export',
      category: 'Seaworthy Packing',
      caption: 'Seaworthy container packaging securing heavy export products for international ocean freight.',
      order: 3,
      image: '/uploads/seaworthy_packing.jpg'
    },
    {
      title: 'Moisture Barrier Seaworthy Packing',
      category: 'Seaworthy Packing',
      caption: 'Rigid wooden crate with integrated multi-layer aluminium moisture barrier system.',
      order: 4,
      image: '/uploads/aluminium_barrier_foil.png'
    },
    {
      title: 'Outdoor Silpaulin Cover',
      category: 'Silpaulin Cover',
      caption: 'Heavy duty waterproof silpaulin tarps protecting metal structures from rainy weather.',
      order: 5,
      image: '/uploads/silpaulin_cover.png'
    },
    {
      title: 'Industrial Machine Protection Wrap',
      category: 'Silpaulin Cover',
      caption: 'Premium grade silpaulin film cover wrapped tightly around industrial tools.',
      order: 6,
      image: '/uploads/thermo_shrink_packing.png'
    },
    {
      title: 'Heavy Duty Machinery Cover',
      category: 'Heavy Duty Cover',
      caption: 'Custom fabricated heavy duty protective canvas covering major steel machinery frames.',
      order: 7,
      image: '/uploads/heavy_duty_protective_cover.png'
    },
    {
      title: 'Outdoor Stacking Cover Protection',
      category: 'Heavy Duty Cover',
      caption: 'Reinforced heavy duty weather protection covers for bulk outdoor warehouses.',
      order: 8,
      image: '/uploads/silpaulin_cover.png'
    },
    {
      title: 'Custom Export Box Packing',
      category: 'Export Packing',
      caption: 'ISPM-15 export compliant customized wooden boxes and crates prepared for customs clearance.',
      order: 9,
      image: '/uploads/seaworthy_packing.jpg'
    },
    {
      title: 'Logistics Export Processing',
      category: 'Export Packing',
      caption: 'Export logistics team finalizing security wraps and loading packages in the export terminal.',
      order: 10,
      image: '/uploads/hdpe_roll.png'
    },
    {
      title: 'Advanced Factory Process',
      category: 'Factory Process',
      caption: 'Precision control and manufacturing at VR Packaging solutions plant.',
      order: 11,
      image: '/uploads/desiccants.png'
    },
    {
      title: 'Quality Packaging Assembly',
      category: 'Factory Process',
      caption: 'Skilled operators inspecting structural integrity of wooden bases and plastic wraps.',
      order: 12,
      image: '/uploads/aprons_carrybags.png'
    }
  ];
  for (const item of galleryItems) {
    await Gallery.create(item);
  }
  console.log('✅ Gallery seeded');

  console.log('\n🎉 All content seeded successfully!');
  process.exit(0);
}
seedContent().catch(e => { console.error(e); process.exit(1); });
