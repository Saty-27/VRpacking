import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import GalleryDetail from './pages/GalleryDetail';
import VideoGallery from './pages/VideoGallery';
import VideoGalleryDetail from './pages/VideoGalleryDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Sitemap from './pages/Sitemap';
import SeoPage from './pages/SeoPage';
import AdminLogin from './admin/pages/AdminLogin';
import AdminLayout from './admin/layouts/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminProducts from './admin/pages/AdminProducts';
import AdminBlogs from './admin/pages/AdminBlogs';
import AdminGallery from './admin/pages/AdminGallery';
import AdminInquiries from './admin/pages/AdminInquiries';
import AdminSettings from './admin/pages/AdminSettings';
import AdminSections from './admin/pages/AdminSections';
import AdminPages from './admin/pages/AdminPages';
import AdminVideoGallery from './admin/pages/AdminVideoGallery';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="loading"><div className="spinner" /></div>;
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
}

function ProductRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/${slug}`} replace />;
}

function PublicLayout() {
  return (<><Header /><div style={{ marginTop: 'var(--header-height)' }}><Routes>
    <Route index element={<Home />} />
    <Route path="about-us" element={<About />} />
    <Route path="products" element={<Products />} />
    <Route path="products/:slug" element={<ProductRedirect />} />
    <Route path="services" element={<Services />} />
    <Route path="gallery" element={<Gallery />} />
    <Route path="gallery/:slug" element={<GalleryDetail />} />
    <Route path="video-gallery" element={<VideoGallery />} />
    <Route path="video-gallery/:slug" element={<VideoGalleryDetail />} />
    <Route path="blog" element={<Blog />} />
    <Route path="blog/:slug" element={<BlogDetail />} />
    <Route path="contact-us" element={<Contact />} />
    <Route path="privacy-policy" element={<PrivacyPolicy />} />
    <Route path="terms-and-conditions" element={<TermsConditions />} />
    <Route path="sitemap" element={<Sitemap />} />

    {/* Custom Priority Service SEO Landing Pages */}
    <Route path="seaworthy-packing-in-vadodara" element={<SeoPage pageKey="seaworthy-packing" />} />
    <Route path="vci-packaging-in-vadodara" element={<SeoPage pageKey="vci-packaging" />} />
    <Route path="vci-packaging-manufacturer-in-vadodara" element={<SeoPage pageKey="vci-packaging-manufacturer" />} />
    <Route path="export-packaging-in-vadodara" element={<SeoPage pageKey="export-packaging" />} />
    <Route path="industrial-packaging-solutions-in-vadodara" element={<SeoPage pageKey="industrial-packaging" />} />
    <Route path="aluminium-barrier-foil-packing-in-vadodara" element={<SeoPage pageKey="aluminium-barrier-foil" />} />
    <Route path="thermo-shrink-packing-in-vadodara" element={<SeoPage pageKey="thermo-shrink" />} />
    <Route path="odc-cargo-packing-in-vadodara" element={<SeoPage pageKey="odc-cargo-packing" />} />
    <Route path="desiccant-supplier-in-vadodara" element={<SeoPage pageKey="desiccants" />} />
    <Route path="humidity-indicator-card-supplier-in-vadodara" element={<SeoPage pageKey="humidity-indicator" />} />
    <Route path="silpaulin-tarpaulin-cover-supplier-in-vadodara" element={<SeoPage pageKey="covers" />} />
    <Route path="ld-hm-liner-manufacturer-in-vadodara" element={<SeoPage pageKey="liners" />} />
    <Route path="packaging-consultancy-in-vadodara" element={<SeoPage pageKey="consultancy" />} />

    {/* Custom Product SEO Landing Pages */}
    <Route path="vci-film-roll-in-vadodara" element={<ProductDetail seoSlug="vci-film-roll" />} />
    <Route path="vci-paper-supplier-in-vadodara" element={<ProductDetail seoSlug="vci-paper-supplier" />} />
    <Route path="vci-bags-manufacturer-in-vadodara" element={<ProductDetail seoSlug="vci-bags-manufacturer" />} />
    <Route path="vci-oil-supplier-in-vadodara" element={<ProductDetail seoSlug="vci-oil-supplier" />} />
    <Route path="humidity-indicator-card-in-vadodara" element={<ProductDetail seoSlug="humidity-indicator-card" />} />
    <Route path="desiccant-bags-in-vadodara" element={<ProductDetail seoSlug="desiccant-bags" />} />
    <Route path="seaworthy-wooden-box-packing-in-vadodara" element={<ProductDetail seoSlug="seaworthy-wooden-box-packing" />} />
    <Route path="aluminium-barrier-foil-rolls-in-vadodara" element={<ProductDetail seoSlug="aluminium-barrier-foil-rolls" />} />
    <Route path="aluminium-foil-packing-for-preservation-in-vadodara" element={<ProductDetail seoSlug="aluminium-foil-packing-for-preservation" />} />
    <Route path="heavy-duty-protective-cover-in-vadodara" element={<ProductDetail seoSlug="heavy-duty-protective-cover" />} />
    <Route path="silpaulin-cover-in-vadodara" element={<ProductDetail seoSlug="silpaulin-cover" />} />
    <Route path="tarpaulin-rolls-in-vadodara" element={<ProductDetail seoSlug="tarpaulin-rolls" />} />
    <Route path="odc-cargo-packing-materials-in-vadodara" element={<ProductDetail seoSlug="odc-cargo-packing-materials" />} />
    <Route path="thermo-shrink-packing-in-vadodara" element={<ProductDetail seoSlug="thermo-shrink-packing" />} />
    <Route path="ldpe-shrink-film-in-vadodara" element={<ProductDetail seoSlug="ldpe-shrink-film" />} />
    <Route path="hdpe-roll-supplier-in-vadodara" element={<ProductDetail seoSlug="hdpe-roll-supplier" />} />
    <Route path="ld-hm-liners-in-vadodara" element={<ProductDetail seoSlug="ld-hm-liners" />} />
    <Route path="disposable-aprons-in-vadodara" element={<ProductDetail seoSlug="disposable-aprons" />} />
    <Route path="carry-bags-manufacturer-in-vadodara" element={<ProductDetail seoSlug="carry-bags-manufacturer" />} />
    <Route path="pp-tubing-in-vadodara" element={<ProductDetail seoSlug="pp-tubing" />} />
    <Route path="heavy-duty-liner-bags-in-vadodara" element={<ProductDetail seoSlug="heavy-duty-liner-bags" />} />
    <Route path="perforation-embossing-bags-in-vadodara" element={<ProductDetail seoSlug="perforation-embossing-bags" />} />
    <Route path="valve-type-ld-bags-in-vadodara" element={<ProductDetail seoSlug="valve-type-ld-bags" />} />
    <Route path=":slug" element={<ProductDetail />} />
  </Routes></div><Footer /></>);
}

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="pages" element={<AdminPages />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="video-gallery" element={<AdminVideoGallery />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="sections/:pageName" element={<AdminSections />} />
            </Route>
            <Route path="/*" element={<PublicLayout />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}
