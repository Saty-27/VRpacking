import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaShip, FaLayerGroup, FaTint, FaThermometerHalf, FaBox, FaWrench, FaTruck, FaMapMarkerAlt, FaCheckCircle, FaChevronDown, FaEnvelope, FaPhone, FaGlobeAmericas } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SEOHead from '../components/common/SEOHead';
import InquiryModal from '../components/common/InquiryModal';

const fadeInUp = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };

const pageData = {
  'seaworthy-packing': {
    title: 'Seaworthy Packing in Vadodara',
    h1: 'Seaworthy Packing in Vadodara for Export Cargo & Heavy Machinery',
    metaTitle: 'Seaworthy Packing in Vadodara | Export Wooden Packaging',
    metaDescription: 'Get professional seaworthy packing in Vadodara for export cargo, heavy machinery, CNC machines, transformers and ODC shipments with wooden crates, moisture barriers, and active VCI.',
    icon: <FaShip />,
    intro: 'VR Packaging Solutions provides premium-grade seaworthy packing in Vadodara, Baroda, and GIDC Makarpura for global exporters and engineering firms.',
    content: `
      <h2>Engineered Ocean Freight Protection for Industrial Machinery</h2>
      <p>Shipping heavy industrial equipment across oceans exposes your high-value cargo to severe conditions. Ocean voyages subject machinery to high humidity levels, saltwater spray, continuous engine vibrations, and significant shifting forces. To guarantee that your machinery arrives at the destination port in pristine condition, standard packaging is insufficient. You require engineered <strong>seaworthy packing in Vadodara</strong>.</p>
      
      <h3>Custom Wooden Crating & Framing (ISPM-15 Compliant)</h3>
      <p>Our wooden boxes, crates, bases, and internal braces are designed based on load-distribution principles. We ensure all timber packaging is fully compliant with the <strong>ISPM-15</strong> international standards, featuring the official IPPC certification stamps to enable smooth customs clearance in Europe, the USA, and worldwide. Our heavy-duty pallets can withstand tons of payload, ensuring complete protection during crane lifting operations.</p>
      
      <h3>Multi-Layer Environmental Barrier Systems</h3>
      <p>To block the corrosive saline atmosphere, we wrap and seal components using multi-layer aluminium barrier foils and active VCI (Volatile Corrosion Inhibitor) films. We extract the air from the foil to create a hermetic vacuum package and place container desiccants inside. This holds relative humidity below 40%, eliminating the possibility of rust, mildew, or electrical degradation.</p>
      
      <h2>Servicing Makarpura GIDC and Gujarat Industrial Hubs</h2>
      <p>Based in Vadodara, Gujarat, our team of packing experts provides on-site packing support directly at manufacturing plants in Makarpura GIDC, Ranoli, Halol, Ankleshwar, Bharuch, Dahej, Savli, and Ahmedabad. We cater to automotive exporters, transformer manufacturers, turbine fabricators, and heavy project cargo handlers.</p>
    `,
    applications: ['CNC Machinery Export', 'Heavy Power Transformers', 'Steam & Gas Turbines', 'Automotive Assemblies', 'ODC Project Cargo'],
    faqs: [
      { q: 'What is seaworthy packing?', a: 'Seaworthy packing is export-grade protective packaging designed to withstand the harsh conditions of ocean voyages, including moisture, salt-air corrosion, mechanical shocks, and low-frequency vibrations.' },
      { q: 'Why is ISPM-15 heat treatment required?', a: 'ISPM-15 regulations require wooden packaging materials to be heat-treated to destroy forest pests, preventing ecological contamination in importing countries. Untreated crates face port penalties.' },
      { q: 'Do you provide on-site packing services in Baroda?', a: 'Yes, VR Packaging Solutions provides on-site packing services directly at customer plants in Vadodara, GIDC Makarpura, Halol, Savli, and other industrial areas across Gujarat.' }
    ],
    schemaType: 'Service'
  },
  'vci-packaging': {
    title: 'VCI Packaging in Vadodara',
    h1: 'VCI Packaging in Vadodara for Active Rust and Corrosion Protection',
    metaTitle: 'VCI Packaging in Vadodara | VCI Film, Paper, Bags & Oil Supplier',
    metaDescription: 'VR Packaging Solutions provides VCI packaging in Vadodara including VCI films, VCI papers, VCI bags and VCI oils for rust prevention and corrosion protection of metal parts.',
    icon: <FaShieldAlt />,
    intro: 'Protect your metal components and machined surfaces from oxidation during storage and transit with advanced VCI packaging in Vadodara.',
    content: `
      <h2>The Chemistry of Dry Rust Prevention (Volatile Corrosion Inhibitors)</h2>
      <p>Metal surfaces are highly vulnerable to corrosion when exposed to oxygen and moisture. Traditional rust-preventative oils are messy, require solvent cleaning at the destination, and create environmental disposal challenges. Our dry <strong>VCI packaging in Vadodara</strong> offers a cleaner, faster, and more cost-effective alternative.</p>
      
      <h3>How VCI Technology Works</h3>
      <p>VCI stands for <strong>Volatile Corrosion Inhibitor</strong>. The packaging material (film roll, bag, or paper sheet) is impregnated with specialized chemical compounds that continuously sublimate. These vapor molecules disperse throughout the sealed container and form a thin, monomolecular protective layer on the metallic surface. This barrier blocks the chemical oxidation reaction. When unpacked, the vapor dissipates cleanly, leaving the part ready for assembly.</p>
      
      <h3>Complete VCI Product Range</h3>
      <ul>
        <li><strong>VCI Film Rolls:</strong> Extruded polyethylene wraps providing mechanical strength and active rust prevention.</li>
        <li><strong>VCI Paper Supplier:</strong> Impregnated Kraft paper sheets ideal for wrapping bearings, castings, and sheet metal.</li>
        <li><strong>VCI Bags:</strong> Pre-formed bag styles (flat or gusseted) for packaging automotive components and fasteners.</li>
        <li><strong>VCI Oil:</strong> High-performance liquid coatings for cavities and hard-to-reach internal pipes.</li>
      </ul>
      
      <h2>Custom Solutions for Vadodara Auto Component Manufacturers</h2>
      <p>Our VCI packaging is optimized for both ferrous and non-ferrous metals. We serve engineering units and automotive parts manufacturers in Makarpura GIDC, Baroda, Halol, and Ankleshwar, enabling them to meet export specifications for global OEMs.</p>
    `,
    applications: ['Automotive Spare Parts', 'Steel Coils and Strips', 'Precision Bearings and Gears', 'Machined Castings', 'Electrical Enclosures'],
    faqs: [
      { q: 'What does VCI mean?', a: 'VCI stands for Volatile Corrosion Inhibitor, a technology that releases protective vapors to prevent rust on metal surfaces.' },
      { q: 'Is VCI packaging safe to handle?', a: 'Yes, our VCI products are non-toxic, eco-friendly, and safe for employees on assembly and packaging lines.' },
      { q: 'Is VCL or VLC packing the same as VCI packing?', a: 'Many people search for VCL packing or VLC packing, but the correct industrial term is VCI packaging, which means Volatile Corrosion Inhibitor packaging.' }
    ],
    schemaType: 'Service'
  },
  'vci-packaging-manufacturer': {
    title: 'VCI Packaging Manufacturer in Vadodara',
    h1: 'VCI Packaging Manufacturer & Bulk Supplier in Vadodara, Gujarat',
    metaTitle: 'VCI Packaging Manufacturer in Vadodara | Anti Rust Packaging',
    metaDescription: 'Looking for a VCI packaging manufacturer in Vadodara? VR Packaging Solutions supplies VCI films, bags, papers, and corrosion protection packaging for metal parts.',
    icon: <FaShieldAlt />,
    intro: 'VR Packaging Solutions is a primary manufacturer and bulk supplier of VCI anti-rust films, papers, and protective materials based in Vadodara, Gujarat.',
    content: `
      <h2>Custom-Engineered Anti-Rust Packaging Solutions at Factory Rates</h2>
      <p>As a leading <strong>VCI packaging manufacturer in Vadodara</strong>, we maintain quality standards across our production lines. We formulate our VCI films using high-performance polyethylene resins co-extruded with active corrosion-inhibiting additives. This guarantees uniform vapor dispersion and long-term protection.</p>
      
      <h3>Bespoke Sizes and Thickness Profiles</h3>
      <p>We supply products tailored to your operations. Whether you need heavy-duty VCI film rolls (up to 250 microns), pre-cut VCI paper sheets, zipper-lock VCI bags, or anti-static VCI linings, we configure dimensions, tensile strengths, and print parameters according to your specifications.</p>
      
      <h3>Bulk Supply and GIDC Logistics</h3>
      <p>Operating out of Vadodara, we ensure rapid supply chains to neighboring industrial estates in Makarpura, Savli, Halol, Ankleshwar, Dahej, and Sanand. We support bulk contracts, offering competitive pricing, technical testing certificates, and flexible production schedules.</p>
    `,
    applications: ['Bulk Industrial Wrapping', 'Custom Automotive Linings', 'GIDC Factory Supplies', 'High-Volume Precision Parts Export'],
    faqs: [
      { q: 'Do you supply custom size VCI bags?', a: 'Yes, as a manufacturer, we produce custom VCI bags, sheets, and film wraps according to your dimensions and thickness requirements.' },
      { q: 'What is the lead time for bulk orders?', a: 'Our local manufacturing setup in Vadodara allows us to fulfill standard bulk orders within 3 to 7 business days.' }
    ],
    schemaType: 'LocalBusiness'
  },
  'export-packaging': {
    title: 'Export Packaging in Vadodara',
    h1: 'Export Packaging in Vadodara for Global Sea & Air Freight Cargo',
    metaTitle: 'Export Packaging in Vadodara | Industrial Sea Freight Packing',
    metaDescription: 'VR Packaging Solutions provides export packaging in Vadodara including seaworthy packing, wooden crates, barrier foil packing, VCI packaging, shrink wrapping and moisture control.',
    icon: <FaGlobeAmericas />,
    intro: 'Ensure your cargo is shipping-ready and compliant with international shipping codes using our professional export packaging in Vadodara.',
    content: `
      <h2>Global Compliance and Transit Damage Mitigation</h2>
      <p>Exporting industrial equipment requires compliance with various shipping codes and environmental regulations. Our <strong>export packaging in Vadodara</strong> is designed to protect your cargo from transit damage, moisture, and corrosion, ensuring it arrives safely at international destinations.</p>
      
      <h3>End-to-End Packaging Services</h3>
      <p>We offer a comprehensive range of export packaging solutions, including custom wooden crating, heavy-duty cargo securing, aluminium barrier foil lining, and moisture control. Our designs are tailored to the specific transport route, cargo weight, and sensitivity of your products.</p>
      
      <h3>International Customs Readiness</h3>
      <p>We utilize ISPM-15 certified wood and provide clear documentation support, helping you avoid customs delays and port penalties. We serve exporters across Vadodara, Ahmedabad, Ankleshwar, and Gujarat.</p>
    `,
    applications: ['Export Container Stuffing', 'Marine Freight Securement', 'High-Value Machinery Transit', 'Air Cargo Lightweight Caging'],
    faqs: [
      { q: 'What is export packaging?', a: 'Export packaging refers to the specialized materials and methods used to protect goods during international transport, ensuring they withstand transit handling and meet import regulations.' },
      { q: 'Do you help with container stuffing and lashing?', a: 'Yes, we provide professional lashing, choking, and container stuffing services to prevent cargo movement inside shipping containers.' }
    ],
    schemaType: 'Service'
  },
  'industrial-packaging': {
    title: 'Industrial Packaging Solutions in Vadodara',
    h1: 'Industrial Packaging Solutions in Vadodara for Manufacturing Units',
    metaTitle: 'Industrial Packaging Solutions in Vadodara | VR Packaging',
    metaDescription: 'VR Packaging Solutions provides complete industrial packaging for Vadodara factories, including VCI film, barrier foil, and seaworthy crates.',
    icon: <FaBox />,
    intro: 'Get robust, tailored industrial packaging solutions in Vadodara from VR Packaging Solutions to secure your manufacturing and storage workflows.',
    content: `
      <h2>Custom Packaging Systems for Heavy Industry and Manufacturing</h2>
      <p>Modern factories require reliable packaging materials to prevent product damage during warehousing and transport. We provide a full range of <strong>industrial packaging solutions in Vadodara</strong> to protect heavy machinery, automotive components, chemical powders, and retail goods.</p>
      
      <h3>Material Variety and Custom Options</h3>
      <p>Our catalog includes protective covers, heavy-duty LD/HM liners, PP tubing, shrink films, desiccants, and active VCI materials. We design packaging to match the specific dimensions, handling conditions, and storage requirements of your products.</p>
      
      <h3>GIDC Makarpura and Regional Support</h3>
      <p>We serve manufacturing companies in GIDC Makarpura, Baroda industrial areas, Savli, Halol, and nearby industrial zones, offering quick turnaround times and on-site support.</p>
    `,
    applications: ['Manufacturing Raw Materials', 'Heavy Duty Warehouse Stacking', 'Metal Parts Storage', 'Chemical & Mineral Bagging'],
    faqs: [
      { q: 'What industrial packaging materials do you offer?', a: 'We supply wooden boxes, VCI films, barrier foils, silpaulin covers, tarpaulins, desiccants, and LD/HM bags.' },
      { q: 'Do you cater to small manufacturing units?', a: 'Yes, we provide packaging solutions for both small-scale workshops and large multinational manufacturing units in Gujarat.' }
    ],
    schemaType: 'LocalBusiness'
  },
  'aluminium-barrier-foil': {
    title: 'Aluminium Barrier Foil Packing in Vadodara',
    h1: 'Aluminium Barrier Foil Packing in Vadodara for Hermetic Protection',
    metaTitle: 'Aluminium Barrier Foil Packing in Vadodara | Moisture Barrier',
    metaDescription: 'Get aluminium barrier foil packing in Vadodara for moisture, oxygen, and light protection of export cargo, electronics, defence equipment, and precision machinery.',
    icon: <FaLayerGroup />,
    intro: 'Aluminium barrier foil offers exceptional protection against moisture vapor, oxygen transmission, and light degradation.',
    content: `
      <h2>Maximum Preservation for Sensitive Cargo</h2>
      <p>Ordinary plastic wraps eventually allow moisture and gases to pass through. For highly sensitive items like electronic panels, CNC controllers, aerospace parts, and defence gear, we recommend <strong>aluminium barrier foil packing in Vadodara</strong>.</p>
      
      <h3>Multi-Layer Laminate Structure</h3>
      <p>Our barrier foils feature a multi-layer structure of polyester, aluminium foil, nylon, and polyethylene. This design provides high puncture resistance and low moisture transmission rates, ensuring your cargo remains protected.</p>
      
      <h3>Vacuum Sealing and Desiccants</h3>
      <p>By extracting air from the foil pouch and adding silica gel desiccants, we hold internal humidity levels below 40% RH, protecting electronics and metal parts from corrosion and damage.</p>
    `,
    applications: ['Electronic Panels and Controllers', 'Aerospace Components', 'Defence Weapon Spares', 'Vacuum Preserved Machine Spares'],
    faqs: [
      { q: 'How does barrier foil compare to normal plastic?', a: 'Aluminium barrier foil has a moisture transmission rate that is roughly 80 times lower than standard plastic wrap, offering absolute defense against sea humidity.' },
      { q: 'Can barrier foil packs be custom shaped?', a: 'Yes, we manufacture custom barrier foil bags and shrouds to fit any product size, from small components to large industrial machines.' }
    ],
    schemaType: 'Service'
  },
  'thermo-shrink': {
    title: 'Thermo Shrink Packing in Vadodara',
    h1: 'Thermo Shrink Packing in Vadodara for Heavy Equipment & ODC Cargo',
    metaTitle: 'Thermo Shrink Packing in Vadodara | Industrial Heat Shrink Packing',
    metaDescription: 'VR Packaging Solutions provides thermo shrink packing in Vadodara for machinery, ODC cargo, outdoor equipment, and export shipments requiring weatherproof covering.',
    icon: <FaThermometerHalf />,
    intro: 'Thermo shrink packing provides a form-fitting, weatherproof cover to protect heavy machinery and over-dimensional cargo during transit.',
    content: `
      <h2>Form-Fitting Weatherproof Packaging</h2>
      <p>For large machinery, open-truck shipments, or outdoor storage, standard covers can flap or tear. Our <strong>thermo shrink packing in Vadodara</strong> provides a durable, form-fitting shell that resists wind, rain, and UV damage.</p>
      
      <h3>High-Strength Heat Shrink Films</h3>
      <p>We wrap cargo in heavy-duty LDPE shrink films and apply controlled heat to shrink the plastic. This creates a secure, form-fitting layer that stabilizes the cargo and prevents shifting during transport.</p>
      
      <h3>Applications for ODC Cargo</h3>
      <p>Thermo shrink wrapping is ideal for Over-Dimensional Cargo (ODC) and heavy machinery shipped on open flatbeds, providing protection against dust, soot, rain, and road debris.</p>
    `,
    applications: ['Over-Dimensional Cargo (ODC)', 'Yacht & Marine Transit', 'Outdoor Machinery Winterization', 'Scaffolding Weather Enclosures'],
    faqs: [
      { q: 'Is shrink wrapping waterproof?', a: 'Yes, when heat-sealed correctly, thermo shrink film creates a waterproof and dustproof barrier around the equipment.' },
      { q: 'What thickness of shrink film do you use?', a: 'We use premium industrial-grade shrink film ranging from 150 to 250 microns, depending on the cargo size and transport route.' }
    ],
    schemaType: 'Service'
  },
  'odc-cargo-packing': {
    title: 'ODC Cargo Packing in Vadodara',
    h1: 'ODC Cargo Packing in Vadodara for Oversized Project Cargo',
    metaTitle: 'ODC Cargo Packing in Vadodara | Heavy Machinery Project Packing',
    metaDescription: 'Professional ODC cargo packing in Vadodara with custom timber frames, cradles, heavy strapping and protective covers for oversized machinery and project cargo.',
    icon: <FaTruck />,
    intro: 'Secure and transport over-dimensional and heavy project cargo safely with our ODC cargo packing services in Vadodara.',
    content: `
      <h2>Structural Engineering for Oversized Equipment</h2>
      <p>Transporting Over-Dimensional Cargo (ODC) requires careful planning and custom bracing. Our <strong>ODC cargo packing in Vadodara</strong> uses heavy-duty timber bases and metal tie-downs to secure large, heavy machinery for transport.</p>
      
      <h3>Engineered Timber Bases and Cradles</h3>
      <p>We design custom load-bearing timber structures and cradles to distribute weight evenly and prevent shifting. All wood is heat-treated to meet export regulations, ensuring safe transit for heavy machinery.</p>
      
      <h3>Secure Lashing and Strapping</h3>
      <p>We use high-strength steel lashing, polyester strapping, and custom blocking to secure cargo on flat-rack containers or trailers, reducing the risk of movement during sea or road transit.</p>
    `,
    applications: ['Wind Turbine Component Export', 'Industrial Boiler Shipping', 'Mining and Earthmoving Gear', 'Large Generator Cradling'],
    faqs: [
      { q: 'What is ODC cargo packing?', a: 'ODC (Over-Dimensional Cargo) packing involves designing custom support bases, timber frames, and securing straps to safely transport oversized industrial cargo.' },
      { q: 'Do you design custom wooden cradles?', a: 'Yes, we design custom wooden cradles and bases tailored to the dimensions, weight, and center of gravity of your heavy machinery.' }
    ],
    schemaType: 'Service'
  },
  'desiccants': {
    title: 'Desiccant Supplier in Vadodara',
    h1: 'Industrial Desiccant Supplier in Vadodara for Moisture Control',
    metaTitle: 'Desiccant Supplier in Vadodara | Silica Gel & Clay Desiccants',
    metaDescription: 'VR Packaging Solutions supplies desiccants in Vadodara including silica gel, clay desiccants and moisture absorber bags for export packaging and sealed cargo protection.',
    icon: <FaTint />,
    intro: 'Manage humidity and prevent condensation damage in sealed export packaging with our range of industrial desiccants in Vadodara.',
    content: `
      <h2>Active Humidity Control for Export Packaging</h2>
      <p>Humidity inside sealed containers can condense into droplets, causing rust or mold damage. As a leading <strong>desiccant supplier in Vadodara</strong>, we offer high-absorption silica gel and clay desiccants to keep packaging dry.</p>
      
      <h3>Silica Gel vs. Bentonite Clay Desiccants</h3>
      <p>Silica gel offers high absorption capacity for electronics and instruments, while natural bentonite clay is a cost-effective choice for machinery crates and containers. Both help maintain safe relative humidity levels.</p>
      
      <h3>Moisture Absorber Bags for Container Shipping</h3>
      <p>We supply moisture absorber bags (up to 2kg) to hang inside shipping containers, absorbing ambient moisture and preventing "container rain" during sea transit.</p>
    `,
    applications: ['Vacuum Sealed Foil Linings', 'Export Container Cargo Hanging', 'Electronic Component Preservation', 'Leather & Textile Packing'],
    faqs: [
      { q: 'How many desiccant bags do I need for my crate?', a: 'The amount of desiccant needed depends on the crate volume, packaging material, transit time, and climate. We calculate this based on DIN 55473 standards.' },
      { q: 'Is bentonite clay eco-friendly?', a: 'Yes, bentonite clay is a natural mineral, making it biodegradable and environmentally safe.' }
    ],
    schemaType: 'LocalBusiness'
  },
  'humidity-indicator': {
    title: 'Humidity Indicator Card Supplier in Vadodara',
    h1: 'Humidity Indicator Card Supplier in Vadodara for Sealed Packaging',
    metaTitle: 'Humidity Indicator Card Supplier in Vadodara | Moisture Monitoring',
    metaDescription: 'Get humidity indicator cards in Vadodara for sealed export packaging, aluminium barrier foil packs, electronics, defence equipment and moisture-sensitive cargo.',
    icon: <FaTint />,
    intro: 'Monitor internal humidity levels in sealed vacuum packaging with color-changing humidity indicator cards.',
    content: `
      <h2>Visual Inspection Systems for Moisture-Sensitive Cargo</h2>
      <p>For sealed cargo, you need to know if the interior remains dry. As a leading <strong>humidity indicator card supplier in Vadodara</strong>, we provide cards that change color based on relative humidity levels, allowing for easy inspection.</p>
      
      <h3>How Humidity Indicator Cards (HIC) Work</h3>
      <p>Our indicator cards feature spots impregnated with moisture-sensitive chemicals that change color (typically from blue to pink) as the relative humidity crosses specific thresholds (e.g., 10% to 60% RH). This provides a quick visual check of packaging integrity.</p>
      
      <h3>Applications in Electronics and Defence Packaging</h3>
      <p>Humidity indicators are widely used in vacuum-sealed barrier packaging for electronics, military spares, and optical instruments, helping to confirm that the package remains sealed and dry.</p>
    `,
    applications: ['Military Grade Preservation', 'Electronic Control Systems', 'Aerospace Spare Storage', 'Long-term Machinery Monitoring'],
    faqs: [
      { q: 'Are your humidity indicator cards cobalt-free?', a: 'Yes, we supply cobalt-free and halogen-free indicator cards that comply with EU environmental standards.' },
      { q: 'Can humidity indicators be reused?', a: 'Yes, the chemical change is reversible; the card spots will return to their dry color when humidity levels drop.' }
    ],
    schemaType: 'LocalBusiness'
  },
  'covers': {
    title: 'Silpaulin & Tarpaulin Cover Supplier in Vadodara',
    h1: 'Silpaulin & Tarpaulin Cover Supplier in Vadodara, Gujarat',
    metaTitle: 'Silpaulin & Tarpaulin Cover Supplier in Vadodara | Industrial Covers',
    metaDescription: 'VR Packaging Solutions supplies silpaulin covers, tarpaulin rolls, waterproof covers and heavy-duty protective covers for industrial goods, trucks and warehouses in Vadodara.',
    icon: <FaBox />,
    intro: 'Protect your outdoor inventory and transport cargo from weather damage with our range of silpaulin and tarpaulin covers in Vadodara.',
    content: `
      <h2>Waterproof and UV-Resistant Storage Covers</h2>
      <p>Outdoor storage and road transport expose products to rain and sunlight. As a key <strong>silpaulin cover supplier in Vadodara</strong>, we provide multi-layer cross-laminated sheets and tarpaulin rolls that offer durable weather protection.</p>
      
      <h3>Silpaulin: High Strength & Lightweight</h3>
      <p>Silpaulin covers are cross-laminated to provide high puncture resistance while remaining lightweight, making them easy to handle. They are ideal for covering machinery, construction sites, and agricultural storage.</p>
      
      <h3>Heavy-Duty PVC & HDPE Tarpaulins</h3>
      <p>We supply reinforced tarpaulins with welded hems and brass grommets, providing reliable protection for truck cargo and warehouse materials against rain, wind, and sun.</p>
    `,
    applications: ['Truck and Trailer Tarps', 'Agricultural Tarp Sheets', 'Outdoor Warehouse Overlays', 'Machinery Rain Covers'],
    faqs: [
      { q: 'What is silpaulin?', a: 'Silpaulin is a cross-laminated, multi-layer polyethylene film that offers excellent tear strength, UV resistance, and waterproof properties.' },
      { q: 'Do you offer custom dimensions?', a: 'Yes, we can fabricate silpaulin and tarpaulin covers to custom dimensions, including reinforced eyelets and rope borders.' }
    ],
    schemaType: 'LocalBusiness'
  },
  'liners': {
    title: 'LD/HM Liner Manufacturer in Vadodara',
    h1: 'LD/HM Liner Manufacturer in Vadodara for Bulk Industrial Packaging',
    metaTitle: 'LD/HM Liner Manufacturer in Vadodara | Drum Liners & Bags',
    metaDescription: 'VR Packaging Solutions manufactures LD/HM liners, drum liner bags, heavy-duty liner bags, PP tubing and valve type LD bags for industrial bulk packaging in Vadodara.',
    icon: <FaLayerGroup />,
    intro: 'Protect bulk powders, chemicals, and minerals from moisture and contamination with our custom LD/HM plastic liners.',
    content: `
      <h2>Polyethylene Liners for Drums and Shipping Containers</h2>
      <p>Shipping bulk materials like chemicals, mineral powders, cement, or food ingredients requires reliable containment. As a leading <strong>LD/HM liner manufacturer in Vadodara</strong>, we produce high-strength liner bags to protect your products from contamination.</p>
      
      <h3>HM-HDPE vs. LDPE Plastic Liners</h3>
      <p>HM-HDPE liners provide high tensile strength and puncture resistance for fine chemical powders, while LDPE liners offer flexibility and leakproof sealing for liquids and bulk materials.</p>
      
      <h3>Custom Industrial Bags and Valve Bags</h3>
      <p>We manufacture custom lay-flat PP tubing, gusseted liners, and self-closing valve-type bags. These products are designed for automated filling lines, helping to keep packing operations clean and efficient.</p>
    `,
    applications: ['Chemical Powders Drum Lining', 'Cement & Dry Mix Valve Bags', 'Bulk Food Ingredient Protection', 'PP Tubing wrapping lines'],
    faqs: [
      { q: 'Do you offer food-grade plastic liners?', a: 'Yes, we manufacture food-grade LDPE liners using FDA-approved virgin resins for bulk food packaging.' },
      { q: 'What configurations of liners are available?', a: 'We offer flat bags, gusseted bags, drum liners, container liners, and continuous roll lay-flat tubing.' }
    ],
    schemaType: 'LocalBusiness'
  },
  'consultancy': {
    title: 'Packaging Consultancy in Vadodara',
    h1: 'Packaging Consultancy in Vadodara for Export and Industrial Packing',
    metaTitle: 'Packaging Consultancy in Vadodara | Export Packing Consultant',
    metaDescription: 'Get packaging consultancy in Vadodara for export compliance, material selection, transit damage reduction, cost saving and custom industrial packaging design.',
    icon: <FaWrench />,
    intro: 'Optimize your packaging lines, reduce transit damage, and lower material costs with our packaging consultancy services in Vadodara.',
    content: `
      <h2>Optimize Packing Costs and Safety</h2>
      <p>Incorrect packaging can lead to transit damage, cargo rejections, or high freight costs. Our <strong>packaging consultancy in Vadodara</strong> helps exporters and factories optimize their packaging designs and material choices.</p>
      
      <h3>Risk Assessment and Material Selection</h3>
      <p>Our consultants analyze your transport routes, product dimensions, and weight distribution. We help select the optimal packaging materials, whether wooden crates, VCI films, or barrier foils, balancing protection and cost.</p>
      
      <h3>Standardization and Export Compliance</h3>
      <p>We verify that your packaging processes meet international shipping standards (such as ISPM-15, DIN, and ASTM), helping you ensure safe delivery and smooth customs clearance.</p>
    `,
    applications: ['Export Transit Risk Audit', 'Packaging Cost Reduction', 'Material Selection Verification', 'Custom Wooden Crate Design'],
    faqs: [
      { q: 'Why hire a packaging consultant?', a: 'A consultant helps identify transit risks, optimize packaging materials, reduce over-packaging costs, and ensure compliance with international shipping regulations.' },
      { q: 'Do you provide transit damage audits?', a: 'Yes, we analyze packaging failures, transit route stresses, and moisture logs to suggest corrective packaging designs.' }
    ],
    schemaType: 'Service'
  }
};

const seoPagePaths = {
  'seaworthy-packing': 'seaworthy-packing-in-vadodara',
  'vci-packaging': 'vci-packaging-in-vadodara',
  'vci-packaging-manufacturer': 'vci-packaging-manufacturer-in-vadodara',
  'export-packaging': 'export-packaging-in-vadodara',
  'industrial-packaging': 'industrial-packaging-solutions-in-vadodara',
  'aluminium-barrier-foil': 'aluminium-barrier-foil-packing-in-vadodara',
  'thermo-shrink': 'thermo-shrink-packing-in-vadodara',
  'odc-cargo-packing': 'odc-cargo-packing-in-vadodara',
  'desiccants': 'desiccant-supplier-in-vadodara',
  'humidity-indicator': 'humidity-indicator-card-supplier-in-vadodara',
  'covers': 'silpaulin-tarpaulin-cover-supplier-in-vadodara',
  'liners': 'ld-hm-liner-manufacturer-in-vadodara',
  'consultancy': 'packaging-consultancy-in-vadodara',
};

export default function SeoPage({ pageKey }) {
  const data = pageData[pageKey];
  const [openFaq, setOpenFaq] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageKey]);

  if (!data) return <div className="page-hero"><div className="container"><h1>Page Not Found</h1></div></div>;

  const currentPath = seoPagePaths[pageKey] || `${pageKey}-in-vadodara`;
  const currentUrl = `https://vrpack.co.in/${currentPath}`;

  // Structured Data Schema
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": data.schemaType === 'LocalBusiness' ? 'LocalBusiness' : 'Service',
    "name": data.title,
    "description": data.metaDescription,
    "url": currentUrl,
    "provider": {
      "@type": "LocalBusiness",
      "name": "VR Packaging Solutions",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "253/19-A, GIDC Industrial Estate, Makarpura",
        "addressLocality": "Vadodara",
        "addressRegion": "Gujarat",
        "postalCode": "390010",
        "addressCountry": "IN"
      },
      "telephone": "+917383411611",
      "email": "vijay@vrpack.co.in"
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Vadodara" },
      { "@type": "AdministrativeArea", "name": "Baroda" },
      { "@type": "AdministrativeArea", "name": "Makarpura GIDC" },
      { "@type": "AdministrativeArea", "name": "Gujarat" },
      { "@type": "AdministrativeArea", "name": "Ahmedabad" },
      { "@type": "AdministrativeArea", "name": "Bharuch" },
      { "@type": "AdministrativeArea", "name": "Ankleshwar" },
      { "@type": "AdministrativeArea", "name": "Halol" },
      { "@type": "AdministrativeArea", "name": "Dahej" }
    ],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    }
  };

  // FAQ Schema addition
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  const combinedSchema = [jsonLdSchema, faqSchema];

  return (
    <>
      <SEOHead
        title={data.metaTitle}
        description={data.metaDescription}
        keywords={`${data.title}, Vadodara, Baroda, Makarpura GIDC, Gujarat, industrial packaging, seaworthy packing`}
        canonical={currentUrl}
        schema={combinedSchema}
      />

      {/* Hero Section */}
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)', padding: '60px 0' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(249,115,22,0.15)', color: 'var(--orange)', width: '60px', height: '60px', borderRadius: '50%', fontSize: '1.8rem', marginBottom: '16px' }}>
              {data.icon}
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)', color: 'var(--white)', fontWeight: 800, lineHeight: 1.2, margin: '0 0 14px' }}>
              {data.h1}
            </h1>
            <div className="breadcrumb" style={{ justifyContent: 'center', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link> / 
              <Link to="/services" style={{ color: 'rgba(255,255,255,0.8)' }}>Services</Link> / 
              <span style={{ color: 'var(--white)' }}>{data.title}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro and Detailed Text */}
      <section className="section">
        <div className="container">
          <div className="grid grid-3" style={{ gap: '40px', alignItems: 'flex-start' }}>
            {/* Main Content (2/3 width) */}
            <div style={{ gridColumn: 'span 2' }}>
              <p style={{ fontSize: '1.15rem', color: 'var(--navy)', fontWeight: 600, lineHeight: 1.7, marginBottom: '24px', borderLeft: '4px solid var(--orange)', paddingLeft: '16px' }}>
                {data.intro}
              </p>
              
              <div 
                className="seo-page-body"
                style={{ color: 'var(--grey-dark)', lineHeight: 1.85, fontSize: '1.025rem' }} 
                dangerouslySetInnerHTML={{ __html: data.content }}
              />

              {/* QA Block for AI Answer Engines */}
              <div style={{ background: 'var(--grey-light)', borderLeft: '4px solid var(--blue)', padding: '24px', borderRadius: 'var(--radius-lg)', marginTop: '40px' }}>
                <h3 style={{ color: 'var(--navy)', marginBottom: '16px', fontSize: '1.2rem' }}>About VR Packaging Solutions (Direct Answers)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <strong style={{ color: 'var(--navy)' }}>Question: Who provides seaworthy packing in Vadodara?</strong>
                    <p style={{ margin: '4px 0 0', color: 'var(--grey-dark)' }}>Answer: VR Packaging Solutions provides seaworthy packing in Vadodara for export cargo, heavy machinery, CNC machines, transformers, engineering goods, and ODC project cargo.</p>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--navy)' }}>Question: Who is a VCI packaging manufacturer in Vadodara?</strong>
                    <p style={{ margin: '4px 0 0', color: 'var(--grey-dark)' }}>Answer: VR Packaging Solutions manufactures and supplies VCI packaging products in Vadodara, including VCI films, VCI papers, VCI bags, and VCI oils for rust and corrosion protection of metal parts.</p>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--navy)' }}>Question: Which company provides export packaging in Vadodara?</strong>
                    <p style={{ margin: '4px 0 0', color: 'var(--grey-dark)' }}>Answer: VR Packaging Solutions provides export packaging in Vadodara, including wooden seaworthy packing, VCI corrosion protection, aluminium barrier foil packing, shrink packing, desiccants, and moisture protection solutions.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar (1/3 width) */}
            <aside style={{ background: 'var(--grey-light)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-card)', position: 'sticky', top: '100px' }}>
              <h3 style={{ color: 'var(--navy)', borderBottom: '2px solid var(--orange)', paddingBottom: '10px', marginBottom: '20px' }}>Applications</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px' }}>
                {data.applications.map((app, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: 'var(--navy)', fontWeight: 500, fontSize: '0.95rem' }}>
                    <FaCheckCircle style={{ color: 'var(--orange)', flexShrink: 0 }} /> {app}
                  </li>
                ))}
              </ul>

              <h3 style={{ color: 'var(--navy)', borderBottom: '2px solid var(--orange)', paddingBottom: '10px', marginBottom: '20px' }}>Service Area</h3>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--grey-dark)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                <FaMapMarkerAlt style={{ color: 'var(--orange)', flexShrink: 0, marginTop: '4px' }} />
                <div>
                  <p style={{ margin: '0 0 8px', fontWeight: 600, color: 'var(--navy)' }}>Vadodara / Baroda</p>
                  <p style={{ margin: 0 }}>Makarpura GIDC, Halol, Savli, Ankleshwar, Bharuch, Dahej, Ahmedabad, Gujarat.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-grey">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2>Frequently Asked Questions</h2>
            <p className="subtitle">Common inquiries regarding our packaging products and operations in Vadodara.</p>
          </div>

          <div className="faq-list">
            {data.faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`} style={{ background: 'var(--white)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 'var(--radius-md)', marginBottom: '12px', overflow: 'hidden' }}>
                <button 
                  className="faq-question" 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', outline: 'none' }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--navy)', fontSize: '1.025rem' }}>{faq.q}</span>
                  <FaChevronDown style={{ color: 'var(--orange)', transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(180deg)' : 'none' }} />
                </button>
                <div 
                  className="faq-answer"
                  style={{ display: openFaq === i ? 'block' : 'none', padding: '0 24px 20px', color: 'var(--grey)', lineHeight: 1.7 }}
                >
                  <p style={{ margin: 0 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="section section-gradient">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--white)', marginBottom: '14px' }}>Ready to Secure Your Industrial Cargo?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '30px', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 30px' }}>
            Get custom engineering drawings, quotes, and material specifications for your export shipment from Vadodara.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-lg">
              <FaEnvelope /> Request Consultation
            </button>
            <a href="tel:+917383411611" className="btn btn-outline btn-lg">
              <FaPhone /> Call Consultant
            </a>
            <a href="https://wa.me/917383411611" target="_blank" rel="noreferrer" className="btn btn-lg" style={{ background: '#25d366', color: '#fff', border: '2px solid #25d366' }}>
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      <InquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultProduct={`${data.title} Service`} />
    </>
  );
}
