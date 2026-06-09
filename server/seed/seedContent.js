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
const defaultPages = require('../config/defaultPages');

async function seedContent() {
  await connectDB();

  // Pages
  await Page.deleteMany({});
  await Page.insertMany(defaultPages);
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
    {
      title: 'Seaworthy Packing in Vadodara: Complete Guide for Exporters',
      slug: 'seaworthy-packing-in-vadodara-complete-guide',
      category: 'Export Packaging',
      excerpt: 'The ultimate guide for manufacturers and exporters in Vadodara, Baroda, and Makarpura GIDC looking for seaworthy wood packing, export wooden box crating, and ocean transit protection.',
      content: `<h2>Introduction to Seaworthy Packing in Vadodara</h2>
      <p>For industrial manufacturers in Vadodara, Baroda, and GIDC Makarpura, exporting heavy machinery and precision engineering goods globally is a critical part of operations. However, shipping equipment across oceans exposes cargo to aggressive maritime environments, including salty air, extreme humidity fluctuations, high-amplitude vibrations, and rough handling during transit. This is where professional <strong>seaworthy packing in Vadodara</strong> becomes essential.</p>
      
      <h2>Why Export Machinery Requires Seaworthy Packing</h2>
      <p>Standard transport packing is insufficient for ocean freight. Seaworthy packing is a specialized engineering process designed to keep cargo safe over long voyages. The main threats it mitigates include:</p>
      <ul>
        <li><strong>Salt Spray & Corrosion:</strong> Marine transit involves direct exposure to ocean atmospheres, which are loaded with corrosive chlorides that accelerate metal oxidation.</li>
        <li><strong>Moisture & Condensation:</strong> As cargo ships travel through different climatic zones, temperatures rise and fall, creating "container rain" or internal sweating inside packaging.</li>
        <li><strong>Transit Vibrations:</strong> Heavy machinery is subjected to low-frequency vibrations from ship engines and rough sea motions, which can loosen internal components.</li>
      </ul>
      
      <h2>Core Elements of Seaworthy Packing</h2>
      <p>Professional export packaging companies in Vadodara, like VR Packaging Solutions, utilize a multi-layered defense system:</p>
      <ol>
        <li><strong>Custom Timber Crating:</strong> Heavy-duty load-bearing bases and wooden crates certified under <strong>ISPM-15</strong> standards.</li>
        <li><strong>Hermetic Moisture Barriers:</strong> Laminated aluminium barrier foils that are vacuum-sealed to exclude external air.</li>
        <li><strong>Active Desiccants:</strong> Silica gel or clay desiccant bags placed inside the sealed foil to absorb lingering ambient moisture.</li>
        <li><strong>VCI Rust Prevention:</strong> Volatile Corrosion Inhibitor (VCI) films wrap the metallic surfaces to block chemical rust reactions.</li>
      </ol>

      <h2>Local Support for Vadodara & Gujarat Manufacturers</h2>
      <p>VR Packaging Solutions is a leading seaworthy packing manufacturer in Vadodara, providing complete packaging solutions directly on-site at factories in Makarpura GIDC, Halol, Ankleshwar, Bharuch, Dahej, and Ahmedabad. Our engineered crating conforms to international shipping specifications, ensuring hassle-free customs clearance and damage-free arrival.</p>

      <h2>Frequently Asked Questions</h2>
      <h3>Q1: What is the main difference between standard packing and seaworthy packing?</h3>
      <p>A: Standard packing only protects against dust and minor scrapes. Seaworthy packing is engineered to resist maritime atmospheric corrosion (rust), heavy container moisture, and severe handling shocks during crane loading and unloading.</p>
      <h3>Q2: Why are ISPM-15 wooden boxes mandatory for export packaging in Vadodara?</h3>
      <p>A: International regulations require all raw wood packaging materials to be heat-treated or fumigated (ISPM-15 standard) to prevent the spread of forest pests across borders. Untreated wood crates face immediate rejection at international ports.</p>`,
      metaTitle: 'Seaworthy Packing in Vadodara: Complete Guide for Exporters',
      metaDescription: 'Get expert seaworthy packing in Vadodara. Read our guide on preventing rust, salt spray, and vibration damage for export machinery using wooden crates.',
      tags: ['Seaworthy Packing', 'Vadodara', 'Export Packaging', 'GIDC Makarpura', 'ISPM-15'],
      featuredImage: '/uploads/seaworthy_packing.jpg'
    },
    {
      title: 'VCI Packaging for Rust Prevention: Complete Guide for Metal Parts',
      slug: 'vci-packaging-for-rust-prevention',
      category: 'VCI Products',
      excerpt: 'Discover how Volatile Corrosion Inhibitor (VCI) packaging protects automotive parts, bearings, and precision machinery from rust during sea shipping and storage.',
      content: `<h2>Understanding VCI Technology for Metal Preservation</h2>
      <p>Rust and corrosion cost industrial manufacturers millions of dollars annually in scrapped inventory, reworking, and customer claims. For metal component manufacturers in GIDC Makarpura and Vadodara, preventing rust during storage and sea transit is a top operational priority. The most efficient and clean method to achieve this is <strong>VCI packaging in Vadodara</strong>.</p>
      
      <h2>What is VCI Packaging?</h2>
      <p>VCI stands for <strong>Volatile Corrosion Inhibitor</strong>. Unlike traditional oil coatings or rust preventive greases that require messy applications and post-transit cleaning, VCI products are dry packaging materials. They are infused with advanced chemical inhibitors that continuously sublimate (change from a solid state to a vapor state) at room temperature.</p>
      
      <h2>How VCI Packaging Works</h2>
      <p>When you place metal components inside a VCI film roll or bag:</p>
      <ul>
        <li>The VCI molecules vaporize and disperse throughout the enclosed enclosure.</li>
        <li>These molecules are attracted to metallic surfaces and form an invisible, monomolecular protective layer.</li>
        <li>This barrier neutralizes the electrochemical oxidation process, preventing oxygen and moisture from contacting the metal.</li>
        <li>Once unpacked, the molecules safely evaporate from the metal surface, leaving it clean and ready for immediate assembly or painting.</li>
      </ul>
      
      <h2>Key Types of VCI Products</h2>
      <ul>
        <li><strong>VCI Film Rolls:</strong> Polyethylene wrapping ideal for steel coils, body panels, and engine blocks.</li>
        <li><strong>VCI Paper:</strong> Heavy Kraft paper coated with VCI chemistry, great for interleaving between flat bearings or tools.</li>
        <li><strong>VCI Bags:</strong> Pre-formed bags for bulk hardware, fasteners, and machined spares.</li>
        <li><strong>VCI Oil:</strong> High-penetration liquid for internal pipes or cavities.</li>
      </ul>

      <h2>VCI vs. Traditional Oils and Greases</h2>
      <p>Traditional rust protection relies on heavy oils, which require extensive cleaning using toxic solvents at the destination. VCI packaging eliminates cleaning costs, speeds up packaging lines, and reduces workplace health hazards.</p>

      <h2>Frequently Asked Questions</h2>
      <h3>Q1: Can VCI packaging protect multi-metal components?</h3>
      <p>A: Yes, premium VCI formulations are designed to protect multi-metals, including steel, copper, brass, aluminium, and zinc alloys simultaneously.</p>
      <h3>Q2: How long does VCI packaging remain active?</h3>
      <p>A: When sealed properly inside a protective container, VCI film and paper can protect metal parts from corrosion for 2 to 5 years.</p>`,
      metaTitle: 'VCI Packaging in Vadodara | Anti Rust VCI Film & Paper',
      metaDescription: 'Learn how Volatile Corrosion Inhibitor (VCI) packaging prevents rust on metal components without oil. Expert guide from VCI manufacturer in Vadodara.',
      tags: ['VCI Packaging', 'Rust Prevention', 'Anti Rust Film', 'Metal Parts', 'Vadodara'],
      featuredImage: '/uploads/vci_film_roll.png'
    },
    {
      title: 'Export Packaging Guide for Manufacturers in Vadodara',
      slug: 'export-packaging-guide-for-manufacturers-in-vadodara',
      category: 'Export Packaging',
      excerpt: 'A comprehensive checklist for engineering and manufacturing companies in Baroda and Gujarat preparing cargo for international sea freight.',
      content: `<h2>Step-by-Step Export Packaging Guide for Vadodara Exporters</h2>
      <p>Exporting machinery from industrial hubs like Vadodara, Halol, or Ahmedabad to global destinations requires strict compliance with international shipping guidelines. High humidity, temperature shifts, sea salt air, and rough crane handlings can ruin expensive machinery before it even reaches your client. Follow this comprehensive checklist to ensure your cargo arrives in perfect condition.</p>
      
      <h2>1. Analyze the Logistics and Shipping Route</h2>
      <p>Understand the climate zones your cargo will traverse. Moving goods from hot, tropical areas like Gujarat to cold European ports creates high condensation rates. Ensure you select multi-layer barrier linings and industrial desiccants to combat "container rain".</p>
      
      <h2>2. Apply Anti-Corrosion (VCI) Safeguards</h2>
      <p>Wrap all bare metal, machined surfaces, and precision parts in premium VCI film rolls or VCI papers. This provides active vapor-phase rust protection throughout the trip.</p>
      
      <h2>3. Establish a Hermetic Moisture Seal</h2>
      <p>Use aluminium barrier foil wrapping for moisture-sensitive components, such as electronics or CNC controllers. Hermetically seal the joints with a specialized heat sealer and add desiccant bags inside to absorb residual air moisture.</p>
      
      <h2>4. Choose Certified Wooden Crates (ISPM-15)</h2>
      <p>Ensure all wooden bases, frames, pallets, and bracing planks carry the official IPPC heat-treatment stamp (ISPM-15). Untreated wood can lead to customs delay and port penalties.</p>
      
      <h2>5. Heavy Tie-Downs and Bracing</h2>
      <p>Secure the heavy machinery onto the wooden base using high-strength metal strapping and custom wooden blocks to prevent sliding during ship rolls.</p>

      <h2>Frequently Asked Questions</h2>
      <h3>Q1: Do we need to apply anti-rust oil if we use vacuum barrier foil?</h3>
      <p>A: Generally, no. A properly heat-sealed aluminium barrier foil combined with desiccants keeps relative humidity below 40%, preventing rust. However, combining it with VCI wraps offers the best defense for long voyages.</p>`,
      metaTitle: 'Export Packaging Guide for Manufacturers in Vadodara, Gujarat',
      metaDescription: 'Master export packaging with our checklist for Vadodara manufacturers. Learn about ISPM-15 wooden crates, vacuum sealing, and cargo protection.',
      tags: ['Export Packaging', 'Vadodara', 'ISPM-15', 'Wooden Crates', 'Container Stuffing'],
      featuredImage: '/uploads/hdpe_roll.png'
    },
    {
      title: 'Aluminium Barrier Foil Packing for Moisture Sensitive Export Cargo',
      slug: 'aluminium-barrier-foil-packing-for-moisture-protection',
      category: 'Barrier Foils',
      excerpt: 'Learn why multi-layer aluminium barrier foil rolls are the absolute standard for protecting high-value electronics and defence equipment from ocean moisture.',
      content: `<h2>The Role of Aluminium Barrier Foil in Industrial Export Packing</h2>
      <p>When shipping moisture-sensitive items like electronic panels, defence spare parts, pharmaceutical ingredients, or lab instrumentation, typical plastic bags are inadequate. Ordinary LDPE plastic has a high Water Vapor Transmission Rate (WVTR) and eventually allows ambient moisture to pass through. The industrial solution is <strong>aluminium barrier foil packing in Vadodara</strong>.</p>
      
      <h2>What is Aluminium Barrier Foil?</h2>
      <p>Aluminium barrier foil is a laminated, multi-layer material consisting of multiple protective films:</p>
      <ul>
        <li><strong>Outer Polyester (PET) Layer:</strong> Provides high puncture resistance and tensile strength.</li>
        <li><strong>Middle Aluminium Layer:</strong> Acts as an absolute barrier against moisture vapor, oxygen, gases, and light transmission.</li>
        <li><strong>Inner Polyethylene (LDPE) Layer:</strong> Allows the material to be heat-sealed hermetically.</li>
      </ul>
      
      <h2>Why Vacuum Packing is Critical</h2>
      <p>By encasing the cargo in barrier foil, extracting the air (vacuum packing), and placing silica gel inside, the humidity is held at safe levels (under 40% RH). This completely prevents oxidation, mold, and electronic component damage.</p>

      <h2>Applications in Vadodara Industrial Areas</h2>
      <p>Vadodara is a prominent center for electrical manufacturing. Companies in Makarpura GIDC utilize aluminium foil packaging for transformers, control panels, aerospace parts, and defence gear export.</p>

      <h2>Frequently Asked Questions</h2>
      <h3>Q1: How does aluminium barrier foil compare to normal plastic wrapping?</h3>
      <p>A: Aluminium foil has a transmission rate that is roughly 80 times lower than standard plastic wrap, offering absolute defense against sea humidity.</p>`,
      metaTitle: 'Aluminium Barrier Foil Packing in Vadodara | Moisture Protection',
      metaDescription: 'Discover how multi-layer aluminium barrier foil rolls protect electronic controllers and machinery from salt air. Guide by VR Packaging Solutions Vadodara.',
      tags: ['Barrier Foils', 'Aluminium Foil', 'Moisture Protection', 'Vacuum Sealing', 'Vadodara'],
      featuredImage: '/uploads/aluminium_barrier_foil.png'
    },
    {
      title: 'How to Protect Metal Parts from Corrosion During Sea Freight',
      slug: 'how-to-protect-metal-parts-from-corrosion-during-shipping',
      category: 'VCI Products',
      excerpt: 'An in-depth look at chemical rust reactions during sea shipments and the active prevention methods used by export packaging experts.',
      content: `<h2>The Science of Corrosion During Ocean Voyages</h2>
      <p>Shipping metal components across sea lanes presents the ultimate test for corrosion prevention. The marine atmosphere is saturated with moisture and sodium chloride, which acts as an active electrolyte that accelerates the electrochemical reaction of rust. To protect iron and steel products, manufacturers must implement targeted <strong>corrosion protection packaging in Vadodara</strong>.</p>
      
      <h2>Understanding the Rust Cycle</h2>
      <p>Rust happens when iron, oxygen, and water combine. Salty air increases the conductivity of water droplets, accelerating rust formation. To break this cycle, you must block one of these components.</p>
      
      <h2>Anti-Corrosion Strategies for Exporters</h2>
      <ol>
        <li><strong>Active VCI Protection:</strong> VCI films coat the metal surfaces, forming a protective barrier that prevents electrochemical reactions.</li>
        <li><strong>Vacuum Sealing:</strong> Removes air and moisture from the package environment.</li>
        <li><strong>Industrial Desiccants:</strong> Adsorbs remaining airborne moisture.</li>
      </ol>

      <h2>Best Packaging Practices</h2>
      <p>Do not touch bare metal parts with bare hands, as fingerprints leave corrosive salts. Wrap parts immediately in VCI packaging after cleaning, and seal them securely.</p>

      <h2>Frequently Asked Questions</h2>
      <h3>Q1: What are the main causes of rust during sea freight?</h3>
      <p>A: High relative humidity, salt spray, and extreme temperature swings inside shipping containers causing condensation are the primary causes of metal oxidation.</p>`,
      metaTitle: 'How to Prevent Rust & Corrosion During Sea Freight Shipping',
      metaDescription: 'Learn active corrosion protection methods for sea transport. Use VCI packaging, desiccants, and vacuum foils. Expert guide for Vadodara exporters.',
      tags: ['VCI Packaging', 'Corrosion Protection', 'Sea Freight', 'Metal Parts', 'Rust Prevention'],
      featuredImage: '/uploads/vci_film_roll.png'
    },
    {
      title: 'VCI Film vs VCI Paper: Which is Better for Your Metal Components?',
      slug: 'vci-film-vs-vci-paper-which-is-better',
      category: 'VCI Products',
      excerpt: 'Compare the benefits, protection rates, and application areas of VCI film rolls versus VCI kraft paper for protective industrial wrapping.',
      content: `<h2>Selecting the Right VCI Packaging Medium</h2>
      <p>Choosing between VCI film and VCI paper depends on the shape of your metal components, length of storage, and packing line speeds. Both release Volatile Corrosion Inhibitors to stop rust, but their material properties serve different needs.</p>
      
      <h2>VCI Film Rolls: Pros and Cons</h2>
      <p>VCI film rolls are plastic wraps, making them waterproof, dustproof, and highly stretchable. They allow workers to visually identify wrapped parts and are highly durable for irregular parts.</p>
      
      <h2>VCI Kraft Paper: Pros and Cons</h2>
      <p>VCI paper absorbs surface condensation and oil residues, making it excellent for oil-coated bearings or flat metal sheets. It is easy to tear and wrap manually, and is highly biodegradable.</p>

      <h2>Comparative Overview</h2>
      <p>Use VCI film for long-term outdoor storage or overseas shipments where moisture protection is required. Use VCI paper for dry, indoor parts, interleaving, or when shipping flat components.</p>`,
      metaTitle: 'VCI Film vs VCI Paper: Rust Prevention Packaging Comparison',
      metaDescription: 'VCI film vs VCI paper comparison guide. Learn which rust-inhibiting packaging material is best for your industrial steel and automotive parts.',
      tags: ['VCI Packaging', 'VCI Film', 'VCI Paper', 'Rust Prevention', 'Industrial Packaging'],
      featuredImage: '/uploads/vci_film_roll.png'
    },
    {
      title: 'Why Desiccants and Humidity Indicators Are Important in Export Packaging',
      slug: 'why-desiccants-and-humidity-indicators-are-important',
      category: 'VCI Products',
      excerpt: 'An overview of active moisture management inside sealed crates, focusing on silica gel, clay desiccants, and color-changing humidity indicator cards.',
      content: `<h2>Active Moisture Control in Sealed Export Shipments</h2>
      <p>Even with high-strength crates, trapped humidity inside sealed packaging can cause condensation damage. Industrial desiccants and humidity indicators help manage and monitor relative humidity (RH) inside export boxes.</p>
      
      <h2>Types of Industrial Desiccants</h2>
      <ul>
        <li><strong>Silica Gel:</strong> Highly active synthetic desiccant with exceptional moisture absorption capacity.</li>
        <li><strong>Bentonite Clay:</strong> Natural, cost-effective desiccant that performs exceptionally well in moderate temperature zones.</li>
      </ul>
      
      <h2>How Humidity Indicator Cards Work</h2>
      <p>These cards feature moisture-sensitive chemical spots that change color as humidity changes, letting inspectors easily check if moisture levels inside are safe.</p>`,
      metaTitle: 'Desiccants & Humidity Indicators in Export Packaging | Vadodara',
      metaDescription: 'Understand how silica gel, clay desiccants, and humidity cards prevent condensation inside export crates. Learn more from VR Packaging Vadodara.',
      tags: ['Desiccants', 'Moisture Protection', 'Humidity Indicator', 'Silica Gel', 'Vadodara'],
      featuredImage: '/uploads/humidity_indicator.png'
    },
    {
      title: 'ODC Cargo Packing Guide for Heavy Machinery and Project Cargo',
      slug: 'odc-cargo-packing-guide',
      category: 'Export Packaging',
      excerpt: 'Learn the safety procedures and structural engineering required to secure over-dimensional cargo (ODC) and heavy machinery for export.',
      content: `<h2>Engineering Safe Packing for Over-Dimensional Cargo (ODC)</h2>
      <p>Shipping Over-Dimensional Cargo (ODC) requires custom-engineered timber cradles and heavy-duty tie-downs. Standard shipping crates cannot support these heavy loads.</p>
      
      <h2>Key Factors in ODC Cargo Packing</h2>
      <p>Designing ODC packaging involves calculating load distribution, center of gravity, and lifting points. We reinforce the base structures using high-tensile steel tie-downs and heavy timber blocks.</p>`,
      metaTitle: 'ODC Cargo Packing Guide | Heavy Machinery Project Packing',
      metaDescription: 'Learn how ODC cargo packing securing methods, heavy wooden cradling, and steel tie-downs protect oversized machinery during export shipping.',
      tags: ['Export Packaging', 'ODC Cargo', 'Project Cargo', 'Heavy Machinery', 'Vadodara'],
      featuredImage: '/uploads/odc_cargo_packing.jpg'
    },
    {
      title: 'Thermo Shrink Packing for Heavy Machinery: Benefits and Applications',
      slug: 'thermo-shrink-packing-for-heavy-machinery',
      category: 'Shrink Films',
      excerpt: 'Discover the advantages of form-fitting heat shrink wrapping over traditional canvas covers for outdoor machinery protection.',
      content: `<h2>The Advantages of Heat Shrink Wrapping for Machinery</h2>
      <p>Thermo shrink packing provides a form-fitting, weatherproof barrier around heavy machinery, keeping out dust, rain, and UV rays during transport.</p>
      
      <h2>Benefits of Thermo Shrink Film</h2>
      <p>Heat shrink film resists tearing under high wind loads, making it ideal for open flatbed trailer transport. It forms a clean, professional shell that prevents moisture ingress.</p>`,
      metaTitle: 'Thermo Shrink Packing in Vadodara | Heavy Machinery Shrink Wrap',
      metaDescription: 'Explore the benefits of thermo shrink packing for machinery. Protect heavy equipment from dust and rain with weatherproof shrink film wrapping.',
      tags: ['Shrink Films', 'Thermo Shrink', 'Machinery Packing', 'Weatherproof', 'Vadodara'],
      featuredImage: '/uploads/thermo_shrink_packing.png'
    },
    {
      title: 'Industrial Packaging Solutions for Vadodara Manufacturers',
      slug: 'industrial-packaging-solutions-for-vadodara-manufacturers',
      category: 'Industrial Packaging',
      excerpt: 'An overview of industrial packaging materials and logistics requirements for factories operating in Makarpura GIDC and Baroda.',
      content: `<h2>Industrial Packaging Trends in Vadodara, Gujarat</h2>
      <p>As Vadodara\'s industrial sector continues to grow, local manufacturers require high-quality protective packaging materials, including VCI films, heavy-duty covers, and custom crating.</p>
      
      <h2>Meeting Local Factory Needs</h2>
      <p>With major industrial zones like Makarpura GIDC and Halol nearby, having a local packaging supplier ensures fast delivery, tailored dimensions, and on-site support.</p>`,
      metaTitle: 'Industrial Packaging Solutions in Vadodara | VR Packaging',
      metaDescription: 'VR Packaging Solutions provides complete industrial packaging for Vadodara factories, including VCI film, barrier foil, and seaworthy crates.',
      tags: ['Industrial Packaging', 'Vadodara', 'Makarpura GIDC', 'Manufacturing', 'Gujarat'],
      featuredImage: '/uploads/hdpe_roll.png'
    },
    {
      title: 'ISPM-15 Wooden Packing for Export: What Manufacturers Should Know',
      slug: 'ispm-15-wooden-packing-for-export',
      category: 'Export Packaging',
      excerpt: 'Learn about the ISPM-15 guidelines for heat treatment and chemical fumigation of wood pallets, crates, and dunnage.',
      content: `<h2>Understanding ISPM-15 Wood Packaging Regulations</h2>
      <p>ISPM-15 standards require all wooden export packaging to undergo heat treatment or fumigation to eliminate pests, preventing ecological damage at destination ports.</p>
      
      <h2>IPPC Stamp Requirements</h2>
      <p>Every treated wooden crate or pallet must carry the official IPPC stamp, which details the country of origin, treatment facility ID, and the treatment method used.</p>`,
      metaTitle: 'ISPM-15 Wooden Crates for Export Packaging | Vadodara',
      metaDescription: 'Learn about the ISPM-15 wooden packaging standards for export. Ensure your wooden crates and pallets pass international customs inspection.',
      tags: ['Export Packaging', 'ISPM-15', 'Wooden Crates', 'Customs Clearance', 'Vadodara'],
      featuredImage: '/uploads/seaworthy_packing.jpg'
    },
    {
      title: 'Best Packaging Solutions for Automotive Components',
      slug: 'best-packaging-solutions-for-automotive-components',
      category: 'VCI Products',
      excerpt: 'A review of packaging methods used to protect automotive engine parts, gears, and body panels from moisture and corrosion.',
      content: `<h2>Optimizing Automotive Spare Parts Packaging</h2>
      <p>Automotive components, such as brake discs, gears, and engine blocks, are highly prone to oxidation. Protecting them requires active VCI packaging solutions.</p>
      
      <h2>VCI Bags and Film Wraps for Auto Parts</h2>
      <p>VCI bags allow automotive parts to go directly from packaging lines to assembly lines without requiring solvent cleaning, reducing labor costs.</p>`,
      metaTitle: 'VCI Packaging for Auto Parts in Vadodara | Rust Prevention',
      metaDescription: 'Protect automotive parts from rust with VCI packaging. Find out why auto component manufacturers choose dry VCI film over rust preventive oils.',
      tags: ['VCI Packaging', 'Auto Parts', 'Rust Prevention', 'Automotive', 'Vadodara'],
      featuredImage: '/uploads/vci_film_roll.png'
    },
    {
      title: 'Packaging Consultancy for Exporters: How to Reduce Transit Damage',
      slug: 'packaging-consultancy-for-exporters',
      category: 'Industrial Packaging',
      excerpt: 'How expert industrial packaging consultants identify transit risks, optimize packing material selection, and reduce shipping losses.',
      content: `<h2>How Packaging Consultancy Saves Export Overhead Costs</h2>
      <p>Professional packaging consultants inspect packing methods, shipping paths, and load weights to design optimized packaging setups that reduce transit damage.</p>
      
      <h2>Cost Reduction and Efficiency</h2>
      <p>Over-packaging increases freight costs, while under-packaging leads to damaged goods. A packaging audit ensures the optimal balance of materials.</p>`,
      metaTitle: 'Industrial Packaging Consultancy in Vadodara | Transit Safety',
      metaDescription: 'Optimize export packing lines and reduce transit damage with professional packaging consultancy. Learn more from VR Packaging Vadodara.',
      tags: ['Industrial Packaging', 'Consultancy', 'Transit Safety', 'Cost Optimization', 'Vadodara'],
      featuredImage: '/uploads/desiccants.png'
    },
    {
      title: 'Silpaulin vs Tarpaulin: Which Cover is Better for Industrial Use?',
      slug: 'silpaulin-vs-tarpaulin',
      category: 'Protective Covers',
      excerpt: 'Compare cross-laminated silpaulin covers with traditional HDPE/PVC tarpaulins for industrial machinery protection and storage.',
      content: `<h2>Choosing the Right Waterproof Industrial Machine Cover</h2>
      <p>Comparing cross-laminated silpaulin sheets with heavy-duty tarpaulins helps determine the best cover option for protecting outdoor equipment and warehouses.</p>
      
      <h2>Silpaulin Covers: Lightweight & Durable</h2>
      <p>Silpaulin is a cross-laminated film that offers exceptional puncture resistance, making it ideal for covering outdoor cargo and machinery.</p>
      
      <h2>Tarpaulin Rolls: General Protection</h2>
      <p>Traditional tarpaulins are robust and cost-effective, providing excellent wind and water protection for truck beds and temporary storage yards.</p>`,
      metaTitle: 'Silpaulin vs Tarpaulin: Industrial Waterproof Cover Comparison',
      metaDescription: 'Silpaulin vs tarpaulin comparison guide. Find the best waterproof, UV-resistant cover for industrial machinery and warehouse storage in Vadodara.',
      tags: ['Protective Covers', 'Silpaulin', 'Tarpaulin', 'Waterproof Cover', 'Vadodara'],
      featuredImage: '/uploads/silpaulin_cover.png'
    },
    {
      title: 'LD/HM Liners and Heavy-Duty Liner Bags for Industrial Bulk Packing',
      slug: 'ld-hm-liners-and-heavy-duty-liner-bags',
      category: 'Industrial Bags',
      excerpt: 'Learn the advantages of using high-molecular (HM) and low-density (LD) polyethylene liners inside steel drums and containers for chemical storage.',
      content: `<h2>Using LD/HM Liners for Chemical and Bulk Material Packaging</h2>
      <p>LD/HM liners protect bulk materials inside steel drums or cardboard containers from moisture ingress and contamination.</p>
      
      <h2>HM-HDPE vs LDPE Liners</h2>
      <p>HM-HDPE liners offer high tensile strength and puncture resistance for fine chemical powders, while LDPE liners provide excellent flexibility and leakproof sealing.</p>`,
      metaTitle: 'LD/HM Liners & Heavy Duty Bags in Vadodara | VR Packaging',
      metaDescription: 'LD/HM liner bags and drum liners protect bulk powders and chemical materials. High-strength plastic liner manufacturer in Vadodara.',
      tags: ['Industrial Bags', 'LD HM Liners', 'Drum Liners', 'Chemical Packing', 'Vadodara'],
      featuredImage: '/uploads/ld_hm_liners.png'
    }
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
