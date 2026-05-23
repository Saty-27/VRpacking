import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Sitemap from './pages/Sitemap';
import AdminLogin from './admin/pages/AdminLogin';
import AdminLayout from './admin/layouts/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminProducts from './admin/pages/AdminProducts';
import AdminBlogs from './admin/pages/AdminBlogs';
import AdminGallery from './admin/pages/AdminGallery';
import AdminInquiries from './admin/pages/AdminInquiries';
import AdminSettings from './admin/pages/AdminSettings';
import AdminSections from './admin/pages/AdminSections';
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

function PublicLayout() {
  return (<><Header /><div style={{ marginTop: 'var(--header-height)' }}><Routes>
    <Route index element={<Home />} />
    <Route path="about-us" element={<About />} />
    <Route path="products" element={<Products />} />
    <Route path="products/:slug" element={<ProductDetail />} />
    <Route path="services" element={<Services />} />
    <Route path="gallery" element={<Gallery />} />
    <Route path="gallery/:slug" element={<GalleryDetail />} />
    <Route path="blog" element={<Blog />} />
    <Route path="blog/:slug" element={<BlogDetail />} />
    <Route path="contact-us" element={<Contact />} />
    <Route path="privacy-policy" element={<PrivacyPolicy />} />
    <Route path="terms-and-conditions" element={<TermsConditions />} />
    <Route path="sitemap" element={<Sitemap />} />
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
              <Route path="products" element={<AdminProducts />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="gallery" element={<AdminGallery />} />
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
