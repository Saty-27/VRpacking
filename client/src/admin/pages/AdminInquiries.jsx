import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaTrash, FaDownload, FaEye } from 'react-icons/fa';
import api, { API_URL } from '../../utils/api';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const load = () => { api.get('/inquiries/admin').then(r => setInquiries(r.data)).catch(() => {}); };
  useEffect(() => { load(); }, []);

  const markRead = async (id, status) => { await api.put(`/inquiries/admin/${id}`, { status }); toast.success('Status updated'); load(); };
  const deleteInq = async (id) => { if (!window.confirm('Delete this inquiry?')) return; await api.delete(`/inquiries/admin/${id}`); toast.success('Deleted'); load(); };
  const exportCSV = () => { window.open(`${API_URL}/api/inquiries/admin/export`, '_blank'); };

  return (<div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30 }}><h2>Inquiries ({inquiries.length})</h2><button className="btn btn-secondary" onClick={exportCSV}><FaDownload /> Export CSV</button></div>
    <div className="card"><table style={{ width: '100%', borderCollapse: 'collapse' }}><thead><tr style={{ borderBottom: '2px solid var(--grey-light)', textAlign: 'left' }}><th style={{ padding: 10 }}>Name</th><th style={{ padding: 10 }}>Company</th><th style={{ padding: 10 }}>Email</th><th style={{ padding: 10 }}>Phone</th><th style={{ padding: 10 }}>Product</th><th style={{ padding: 10 }}>Status</th><th style={{ padding: 10 }}>Date</th><th style={{ padding: 10 }}>Actions</th></tr></thead><tbody>
      {inquiries.map(i => <tr key={i._id} style={{ borderBottom: '1px solid var(--grey-light)', background: i.status === 'unread' ? 'rgba(249,115,22,0.03)' : 'transparent' }}><td style={{ padding: 10, fontWeight: i.status === 'unread' ? 700 : 400 }}>{i.name}</td><td style={{ padding: 10, color: 'var(--grey)' }}>{i.companyName || '-'}</td><td style={{ padding: 10, color: 'var(--grey)' }}>{i.email}</td><td style={{ padding: 10, color: 'var(--grey)' }}>{i.phone || '-'}</td><td style={{ padding: 10, color: 'var(--grey)' }}>{i.productInterested || '-'}</td><td style={{ padding: 10 }}><span className={`badge ${i.status === 'unread' ? 'badge-orange' : 'badge-blue'}`}>{i.status}</span></td><td style={{ padding: 10, fontSize: '0.85rem', color: 'var(--grey)' }}>{new Date(i.createdAt).toLocaleDateString()}</td><td style={{ padding: 10 }}><div style={{ display: 'flex', gap: 6 }}><button onClick={() => markRead(i._id, i.status === 'unread' ? 'read' : 'unread')} className="btn btn-sm btn-outline-dark"><FaEye /></button><button onClick={() => deleteInq(i._id)} className="btn btn-sm" style={{ background: 'var(--danger)', color: 'white', border: 'none', padding: '8px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}><FaTrash /></button></div></td></tr>)}
    </tbody></table>{inquiries.length === 0 && <p style={{ textAlign: 'center', padding: 40, color: 'var(--grey)' }}>No inquiries yet</p>}</div>
  </div>);
}
