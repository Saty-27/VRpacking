import { Helmet } from 'react-helmet-async';

export default function SEOHead({ title, description, keywords, canonical, ogImage, schema }) {
  const siteName = 'VR Packaging Solutions';
  const defaultTitle = 'VR Packaging Solutions | VCI & Seaworthy Packaging Manufacturer in Vadodara';
  const fullTitle = title ? (title.includes(siteName) ? title : `${title} | ${siteName}`) : defaultTitle;
  const defaultDescription = 'VR Packaging Solutions provides industrial packaging materials and custom-made packaging solutions for corrosion protection, moisture control, seaworthy packing, VCI packaging, shrink wrapping, and export packaging in Vadodara, Gujarat.';
  const metaDescription = description || defaultDescription;
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const canonicalUrl = canonical || `https://vrpack.co.in${currentPath === '/' ? '/' : currentPath}`;
  const imageUrl = ogImage || 'https://vrpack.co.in/og-image.png';
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
}
