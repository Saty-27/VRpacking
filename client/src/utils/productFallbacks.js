export const fallbackProducts = [
  {
    _id: 'fallback-vci-film',
    name: 'VCI Film Roll',
    slug: 'vci-film-roll',
    category: { name: 'VCI Products' },
    shortDescription: 'VCI film rolls for corrosion protection of metal parts during storage, transit, and export movement.',
    features: ['Corrosion protection', 'Suitable for metal parts', 'Custom roll supply'],
    applications: ['Automotive parts', 'Engineering goods', 'Export packing'],
    benefits: ['Helps reduce rust risk', 'Clean dry protection', 'Suitable for bulk wrapping'],
  },
  {
    _id: 'fallback-barrier-foil',
    name: 'Aluminium Barrier Foil Rolls',
    slug: 'aluminium-barrier-foil-rolls',
    category: { name: 'Barrier Foil' },
    shortDescription: 'Barrier foil rolls for moisture protection and preservation of industrial products during long-distance shipping.',
    features: ['Moisture barrier', 'Export packing support', 'Preservation-grade material'],
    applications: ['Seaworthy packing', 'Machinery preservation', 'Moisture-sensitive goods'],
    benefits: ['Controls moisture exposure', 'Supports long transit', 'Pairs with desiccants'],
  },
  {
    _id: 'fallback-silpaulin',
    name: 'Silpaulin Cover',
    slug: 'silpaulin-cover',
    category: { name: 'Protective Covers' },
    shortDescription: 'Heavy-duty Silpaulin covers for industrial storage, outdoor protection, and transit safety.',
    features: ['Heavy-duty cover', 'Outdoor protection', 'Custom sizing'],
    applications: ['Machinery covers', 'Industrial storage', 'Transit protection'],
    benefits: ['Dust and weather protection', 'Reusable covering', 'Suitable for large equipment'],
  },
  {
    _id: 'fallback-liner-bags',
    name: 'Heavy Duty Liner Bags',
    slug: 'heavy-duty-liner-bags',
    category: { name: 'Industrial Bags' },
    shortDescription: 'Heavy-duty liner bags for bulk material handling, industrial packing, and protective inner lining.',
    features: ['Bulk packing', 'Industrial-grade liners', 'Custom sizes'],
    applications: ['Bulk goods', 'Industrial materials', 'Inner packaging'],
    benefits: ['Improves handling safety', 'Protects contents', 'Supports custom packing needs'],
  },
  {
    _id: 'fallback-humidity',
    name: 'Humidity Indicator',
    slug: 'humidity-indicator-card',
    category: { name: 'Moisture Control' },
    shortDescription: 'Humidity indicator cards for monitoring moisture exposure in sealed export and storage packaging.',
    features: ['Moisture indication', 'Simple visual check', 'Packing quality support'],
    applications: ['Barrier foil packing', 'Electronics packing', 'Export shipments'],
    benefits: ['Helps monitor humidity', 'Supports inspection', 'Useful with desiccants'],
  },
  {
    _id: 'fallback-desiccants',
    name: 'Desiccants',
    slug: 'desiccant-bags',
    category: { name: 'Moisture Control' },
    shortDescription: 'Desiccant bags for moisture absorption in industrial packaging, storage, and export cargo.',
    features: ['Moisture absorption', 'Multiple packing sizes', 'Export packing support'],
    applications: ['Container packing', 'Barrier foil packing', 'Storage protection'],
    benefits: ['Reduces moisture risk', 'Protects packed goods', 'Pairs with humidity indicators'],
  },
  {
    _id: 'fallback-shrink',
    name: 'LDPE Shrink Film',
    slug: 'ldpe-shrink-film',
    category: { name: 'Shrink Packing' },
    shortDescription: 'LDPE shrink film for secure wrapping, dust protection, and product handling safety.',
    features: ['Shrink wrapping', 'Dust protection', 'Flexible application'],
    applications: ['Pallet wrapping', 'Equipment packing', 'Industrial dispatch'],
    benefits: ['Tighter package protection', 'Cleaner handling', 'Good transit support'],
  },
  {
    _id: 'fallback-hdpe',
    name: 'HDPE Roll',
    slug: 'hdpe-roll-supplier',
    category: { name: 'Industrial Rolls' },
    shortDescription: 'HDPE rolls for protective industrial wrapping, lining, and packaging applications.',
    features: ['Industrial-grade roll', 'Protective wrapping', 'Custom supply'],
    applications: ['Industrial packing', 'Lining work', 'Protective covers'],
    benefits: ['Durable material', 'Flexible usage', 'Useful for custom packing'],
  },
];

export const formatProductTitle = (slug = '') => (
  slug
    .split('-')
    .filter(Boolean)
    .map(word => {
      const upper = word.toUpperCase();
      if (['VCI', 'HDPE', 'LDPE', 'PP', 'ODC'].includes(upper)) return upper;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ') || 'Product Details'
);

export const getFallbackProduct = (slug) => {
  const product = fallbackProducts.find(item => item.slug === slug);
  if (!product) return null;

  return {
    ...product,
    images: [],
    metaTitle: `${product.name} | VR Packaging Solutions`,
    metaDescription: product.shortDescription,
    longDescription: `
      <h2>Overview</h2>
      <p>${product.shortDescription}</p>
      <h2>Industrial Use</h2>
      <p>This product is used as part of custom industrial, protective, export, and transit packaging solutions from VR Packaging Solutions.</p>
      <h2>Need a Quote?</h2>
      <p>Share your product size, packing quantity, storage condition, and transport route so the team can suggest a suitable specification.</p>
    `,
  };
};
