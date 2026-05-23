import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaTachometerAlt, FaBox, FaBlog, FaImage, FaEnvelope, FaCog, FaSignOutAlt, FaBars, FaTimes, FaLayerGroup, FaQuestionCircle, FaStar, FaFileAlt } from 'react-icons/fa';
import { useState } from 'react';
import './AdminLayout.css';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const links = [
    { path: '/admin', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { path: '/admin/sections/home', icon: <FaLayerGroup />, label: 'Home Sections' },
    { path: '/admin/sections/about', icon: <FaLayerGroup />, label: 'About Sections' },
    { path: '/admin/sections/contact', icon: <FaLayerGroup />, label: 'Contact Sections' },
    { path: '/admin/products', icon: <FaBox />, label: 'Products' },
    { path: '/admin/blogs', icon: <FaBlog />, label: 'Blogs' },
    { path: '/admin/gallery', icon: <FaImage />, label: 'Gallery' },
    { path: '/admin/inquiries', icon: <FaEnvelope />, label: 'Inquiries' },
    { path: '/admin/settings', icon: <FaCog />, label: 'Settings' },
  ];

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/admin" className="sidebar-logo"><span>VR</span> Admin</Link>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}><FaTimes /></button>
        </div>
        <nav className="sidebar-nav">
          {links.map(l => (
            <Link key={l.path} to={l.path} className={`sidebar-link ${location.pathname === l.path ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}>
              {l.icon}<span>{l.label}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="sidebar-link logout"><FaSignOutAlt /><span>Logout</span></button>
        </div>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar">
          <button className="topbar-menu" onClick={() => setSidebarOpen(true)}><FaBars /></button>
          <div className="topbar-right"><span>Welcome, {user?.name || 'Admin'}</span></div>
        </header>
        <div className="admin-content"><Outlet /></div>
      </main>
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}
