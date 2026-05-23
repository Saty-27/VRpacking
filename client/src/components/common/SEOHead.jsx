import { Helmet } from 'react-helmet-async';

export default function SEOHead({ title, description, keywords, canonical, ogImage, schema }) {
  const siteName = 'VR Packaging Solutions';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - VCI & Seaworthy Packaging Manufacturer Vadodara`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || 'VR Packaging Solutions - Leading manufacturer of VCI products and seaworthy packaging solutions in Vadodara, Gujarat.'} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || ''} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:site_name" content={siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || ''} />
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
}
