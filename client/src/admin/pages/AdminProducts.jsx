import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import api, { API_URL } from '../../utils/api';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', category: '', shortDescription: '', longDescription: '', features: '', applications: '', benefits: '', metaTitle: '', metaDescription: '', keywords: '', isPublished: true });
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    api.get('/products/admin/all').then(r => setProducts(r.data)).catch(() => {});
    api.get('/categories').then(r => setCategories(r.data)).catch(() => {});
  };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, features: form.features.split('\n').filter(Boolean), applications: form.applications.split('\n').filter(Boolean), benefits: form.benefits.split('\n').filter(Boolean) };
    try {
      if (editing) { await api.put(`/products/admin/${editing}`, data); toast.success('Product updated'); }
      else { await api.post('/products/admin', data); toast.success('Product created'); }
      setShowForm(false); setEditing(null); setForm({ name: '', category: '', shortDescription: '', longDescription: '', features: '', applications: '', benefits: '', metaTitle: '', metaDescription: '', keywords: '', isPublished: true }); load();
    } catch (err) { toast.error('Error saving product'); }
  };

  const editProduct = (p) => {
    setForm({ name: p.name, category: p.category?._id || '', shortDescription: p.shortDescription, longDescription: p.longDescription, features: (p.features || []).join('\n'), applications: (p.applications || []).join('\n'), benefits: (p.benefits || []).join('\n'), metaTitle: p.metaTitle || '', metaDescription: p.metaDescription || '', keywords: p.keywords || '', isPublished: p.isPublished });
    setEditing(p._id); setShowForm(true);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try { await api.delete(`/products/admin/${id}`); toast.success('Product deleted'); load(); } catch { toast.error('Delete failed'); }
  };

  const togglePublish = async (p) => {
    try { await api.put(`/products/admin/${p._id}`, { isPublished: !p.isPublished }); toast.success('Status updated'); load(); } catch { toast.error('Update failed'); }
  };

  const uploadImage = async (productId, file) => {
    const fd = new FormData(); fd.append('file', file);
    try {
      const { data } = await api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      const product = products.find(p => p._id === productId);
      await api.put(`/products/admin/${productId}`, { images: [...(product.images || []), data.url] });
      toast.success('Image uploaded'); load();
    } catch { toast.error('Upload failed'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h2>Products ({products.length})</h2>
        <button className="btn btn-primary" onClick={() => { setShowForm(!showForm); setEditing(null); setForm({ name: '', category: '', shortDescription: '', longDescription: '', features: '', applications: '', benefits: '', metaTitle: '', metaDescription: '', keywords: '', isPublished: true }); }}><FaPlus /> Add Product</button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 30 }}>
          <h3 style={{ marginBottom: 20 }}>{editing ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-2">
              <div className="form-group"><label>Product Name *</label><input className="form-control" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div className="form-group"><label>Category</label><select className="form-control" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}><option value="">Select</option>{categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}</select></div>
            </div>
            <div className="form-group"><label>Short Description</label><textarea className="form-control" rows={3} value={form.shortDescription} onChange={e => setForm({ ...form, shortDescription: e.target.value })} /></div>
            <div className="form-group"><label>Long Description (HTML)</label><textarea className="form-control" rows={5} value={form.longDescription} onChange={e => setForm({ ...form, longDescription: e.target.value })} /></div>
            <div className="grid grid-3">
              <div className="form-group"><label>Features (one per line)</label><textarea className="form-control" rows={4} value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} /></div>
              <div className="form-group"><label>Applications (one per line)</label><textarea className="form-control" rows={4} value={form.applications} onChange={e => setForm({ ...form, applications: e.target.value })} /></div>
              <div className="form-group"><label>Benefits (one per line)</label><textarea className="form-control" rows={4} value={form.benefits} onChange={e => setForm({ ...form, benefits: e.target.value })} /></div>
            </div>
            <div className="grid grid-3">
              <div className="form-group"><label>SEO Title</label><input className="form-control" value={form.metaTitle} onChange={e => setForm({ ...form, metaTitle: e.target.value })} /></div>
              <div className="form-group"><label>SEO Description</label><input className="form-control" value={form.metaDescription} onChange={e => setForm({ ...form, metaDescription: e.target.value })} /></div>
              <div className="form-group"><label>Keywords</label><input className="form-control" value={form.keywords} onChange={e => setForm({ ...form, keywords: e.target.value })} /></div>
            </div>
            <div className="form-group"><label><input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} style={{ marginRight: 8 }} />Published</label></div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Create'} Product</button>
              <button type="button" className="btn btn-outline-dark" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ borderBottom: '2px solid var(--grey-light)', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Name</th><th style={{ padding: '10px' }}>Category</th><th style={{ padding: '10px' }}>Status</th><th style={{ padding: '10px' }}>Image</th><th style={{ padding: '10px' }}>Actions</th>
          </tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} style={{ borderBottom: '1px solid var(--grey-light)' }}>
                <td style={{ padding: '10px', fontWeight: 600 }}>{p.name}</td>
                <td style={{ padding: '10px', color: 'var(--grey)' }}>{p.category?.name || '-'}</td>
                <td style={{ padding: '10px' }}><span className={`badge ${p.isPublished ? 'badge-blue' : 'badge-orange'}`}>{p.isPublished ? 'Published' : 'Draft'}</span></td>
                <td style={{ padding: '10px' }}><input type="file" accept="image/*" onChange={e => e.target.files[0] && uploadImage(p._id, e.target.files[0])} style={{ fontSize: '0.8rem', maxWidth: 120 }} /></td>
                <td style={{ padding: '10px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => editProduct(p)} className="btn btn-sm btn-secondary" title="Edit"><FaEdit /></button>
                    <button onClick={() => togglePublish(p)} className="btn btn-sm btn-outline-dark" title="Toggle">{p.isPublished ? <FaEyeSlash /> : <FaEye />}</button>
                    <button onClick={() => deleteProduct(p._id)} className="btn btn-sm" style={{ background: 'var(--danger)', color: 'white', border: 'none', padding: '8px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }} title="Delete"><FaTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
