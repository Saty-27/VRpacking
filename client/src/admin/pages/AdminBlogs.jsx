import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import api from '../../utils/api';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'General', excerpt: '', content: '', tags: '', metaTitle: '', metaDescription: '', isPublished: true });

  const load = () => { api.get('/blogs/admin/all').then(r => setBlogs(r.data)).catch(() => {}); };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
    try {
      if (editing) { await api.put(`/blogs/admin/${editing}`, data); toast.success('Blog updated'); }
      else { await api.post('/blogs/admin', data); toast.success('Blog created'); }
      setShowForm(false); setEditing(null); load();
    } catch { toast.error('Error saving blog'); }
  };

  const editBlog = (b) => { setForm({ title: b.title, category: b.category, excerpt: b.excerpt, content: b.content, tags: (b.tags || []).join(', '), metaTitle: b.metaTitle || '', metaDescription: b.metaDescription || '', isPublished: b.isPublished }); setEditing(b._id); setShowForm(true); };

  const deleteBlog = async (id) => { if (!window.confirm('Delete this blog?')) return; await api.delete(`/blogs/admin/${id}`); toast.success('Deleted'); load(); };

  return (<div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30 }}><h2>Blogs ({blogs.length})</h2><button className="btn btn-primary" onClick={() => { setShowForm(!showForm); setEditing(null); setForm({ title: '', category: 'General', excerpt: '', content: '', tags: '', metaTitle: '', metaDescription: '', isPublished: true }); }}><FaPlus /> Add Blog</button></div>

    {showForm && <div className="card" style={{ marginBottom: 30 }}><h3 style={{ marginBottom: 20 }}>{editing ? 'Edit' : 'Add'} Blog</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-2"><div className="form-group"><label>Title *</label><input className="form-control" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div><div className="form-group"><label>Category</label><input className="form-control" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} /></div></div>
        <div className="form-group"><label>Excerpt</label><textarea className="form-control" rows={2} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} /></div>
        <div className="form-group"><label>Content (HTML)</label><textarea className="form-control" rows={10} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} /></div>
        <div className="grid grid-3"><div className="form-group"><label>Tags (comma separated)</label><input className="form-control" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} /></div><div className="form-group"><label>SEO Title</label><input className="form-control" value={form.metaTitle} onChange={e => setForm({ ...form, metaTitle: e.target.value })} /></div><div className="form-group"><label>SEO Description</label><input className="form-control" value={form.metaDescription} onChange={e => setForm({ ...form, metaDescription: e.target.value })} /></div></div>
        <div className="form-group"><label><input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} style={{ marginRight: 8 }} />Published</label></div>
        <div style={{ display: 'flex', gap: 10 }}><button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Create'}</button><button type="button" className="btn btn-outline-dark" onClick={() => setShowForm(false)}>Cancel</button></div>
      </form>
    </div>}

    <div className="card"><table style={{ width: '100%', borderCollapse: 'collapse' }}><thead><tr style={{ borderBottom: '2px solid var(--grey-light)', textAlign: 'left' }}><th style={{ padding: 10 }}>Title</th><th style={{ padding: 10 }}>Category</th><th style={{ padding: 10 }}>Status</th><th style={{ padding: 10 }}>Date</th><th style={{ padding: 10 }}>Actions</th></tr></thead><tbody>
      {blogs.map(b => <tr key={b._id} style={{ borderBottom: '1px solid var(--grey-light)' }}><td style={{ padding: 10, fontWeight: 600 }}>{b.title}</td><td style={{ padding: 10, color: 'var(--grey)' }}>{b.category}</td><td style={{ padding: 10 }}><span className={`badge ${b.isPublished ? 'badge-blue' : 'badge-orange'}`}>{b.isPublished ? 'Published' : 'Draft'}</span></td><td style={{ padding: 10, color: 'var(--grey)', fontSize: '0.85rem' }}>{new Date(b.createdAt).toLocaleDateString()}</td><td style={{ padding: 10 }}><div style={{ display: 'flex', gap: 8 }}><button onClick={() => editBlog(b)} className="btn btn-sm btn-secondary"><FaEdit /></button><button onClick={() => deleteBlog(b._id)} className="btn btn-sm" style={{ background: 'var(--danger)', color: 'white', border: 'none', padding: '8px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}><FaTrash /></button></div></td></tr>)}
    </tbody></table></div>
  </div>);
}
