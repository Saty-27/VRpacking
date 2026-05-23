import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaBlog, FaEnvelope, FaImage, FaCogs, FaEye } from 'react-icons/fa';
import api from '../../utils/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, blogs: 0, inquiries: 0, gallery: 0 });
  const [recentInquiries, setRecentInquiries] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get('/products/admin/all').then(r => r.data.length),
      api.get('/blogs/admin/all').then(r => r.data.length),
      api.get('/inquiries/admin').then(r => r.data),
      api.get('/gallery/admin/all').then(r => r.data.length),
    ]).then(([products, blogs, inquiries, gallery]) => {
      setStats({ products, blogs, inquiries: inquiries.length, gallery });
      setRecentInquiries(inquiries.slice(0, 5));
    }).catch(() => {});
  }, []);

  const cards = [
    { label: 'Products', count: stats.products, icon: <FaBox />, color: '#1a56db', link: '/admin/products' },
    { label: 'Blog Posts', count: stats.blogs, icon: <FaBlog />, color: '#f97316', link: '/admin/blogs' },
    { label: 'Inquiries', count: stats.inquiries, icon: <FaEnvelope />, color: '#10b981', link: '/admin/inquiries' },
    { label: 'Gallery', count: stats.gallery, icon: <FaImage />, color: '#8b5cf6', link: '/admin/gallery' },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 30 }}>Dashboard</h2>
      <div className="grid grid-4" style={{ marginBottom: 40 }}>
        {cards.map(c => (
          <Link key={c.label} to={c.link} className="card" style={{ textDecoration: 'none', borderLeft: `4px solid ${c.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div><p style={{ color: 'var(--grey)', fontSize: '0.85rem', marginBottom: 4 }}>{c.label}</p><h3 style={{ fontSize: '2rem' }}>{c.count}</h3></div>
              <div style={{ fontSize: '2rem', color: c.color, opacity: 0.3 }}>{c.icon}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 20 }}>Recent Inquiries</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ borderBottom: '2px solid var(--grey-light)', textAlign: 'left' }}>
            <th style={{ padding: '10px 12px' }}>Name</th><th style={{ padding: '10px 12px' }}>Email</th><th style={{ padding: '10px 12px' }}>Product</th><th style={{ padding: '10px 12px' }}>Status</th><th style={{ padding: '10px 12px' }}>Date</th>
          </tr></thead>
          <tbody>
            {recentInquiries.map(inq => (
              <tr key={inq._id} style={{ borderBottom: '1px solid var(--grey-light)' }}>
                <td style={{ padding: '10px 12px' }}>{inq.name}</td>
                <td style={{ padding: '10px 12px', color: 'var(--grey)' }}>{inq.email}</td>
                <td style={{ padding: '10px 12px', color: 'var(--grey)' }}>{inq.productInterested || '-'}</td>
                <td style={{ padding: '10px 12px' }}><span className={`badge ${inq.status === 'unread' ? 'badge-orange' : 'badge-blue'}`}>{inq.status}</span></td>
                <td style={{ padding: '10px 12px', color: 'var(--grey)', fontSize: '0.85rem' }}>{new Date(inq.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {recentInquiries.length === 0 && <tr><td colSpan={5} style={{ padding: 20, textAlign: 'center', color: 'var(--grey)' }}>No inquiries yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
