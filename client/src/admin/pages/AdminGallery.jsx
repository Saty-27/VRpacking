import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import api, { API_URL } from '../../utils/api';

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [form, setForm] = useState({
    title: '',
    category: '',
    caption: '',
    image: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    isActive: true
  });

  const categories = [
    'VCI Products',
    'Films & Rolls',
    'Seaworthy Packing',
    'Shrink Packing',
    'Silpaulin Covers',
    'Barrier Foil Packing',
    'Industrial Packaging',
    'Factory Process'
  ];

  const load = () => {
    api.get('/gallery/admin/all')
      .then(r => setImages(r.data))
      .catch(() => {});
  };

  useEffect(() => {
    load();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append('file', file);
    setUploading(true);

    try {
      const { data } = await api.post('/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm(prev => ({
        ...prev,
        image: data.url,
        // Auto-fill title if empty
        title: prev.title || file.name.replace(/\.[^/.]+$/, "")
      }));
      toast.success('Image uploaded successfully');
    } catch {
      toast.error('File upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) {
      toast.error('Please upload an image first');
      return;
    }

    try {
      if (editing) {
        await api.put(`/gallery/admin/${editing}`, form);
        toast.success('Gallery item updated');
      } else {
        await api.post('/gallery/admin', form);
        toast.success('Gallery item created');
      }
      
      resetForm();
      load();
    } catch {
      toast.error('Error saving gallery item');
    }
  };

  const editItem = (img) => {
    setForm({
      title: img.title || '',
      category: img.category || '',
      caption: img.caption || '',
      image: img.image || '',
      slug: img.slug || '',
      metaTitle: img.metaTitle || '',
      metaDescription: img.metaDescription || '',
      keywords: img.keywords || '',
      isActive: img.isActive !== false
    });
    setEditing(img._id);
    setShowForm(true);
  };

  const toggleActive = async (img) => {
    try {
      await api.put(`/gallery/admin/${img._id}`, { isActive: !img.isActive });
      toast.success('Status updated');
      load();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;
    try {
      await api.delete(`/gallery/admin/${id}`);
      toast.success('Gallery item deleted');
      load();
    } catch {
      toast.error('Failed to delete item');
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      category: '',
      caption: '',
      image: '',
      slug: '',
      metaTitle: '',
      metaDescription: '',
      keywords: '',
      isActive: true
    });
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h2>Gallery Manager ({images.length})</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
        >
          {showForm ? 'Cancel' : <><FaPlus /> Add Gallery Item</>}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 30 }}>
          <h3 style={{ marginBottom: 20 }}>{editing ? 'Edit Gallery Item' : 'Add New Gallery Item'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-2">
              <div className="form-group">
                <label>Title *</label>
                <input 
                  type="text" 
                  name="title" 
                  className="form-control" 
                  required 
                  value={form.title} 
                  onChange={handleInputChange} 
                  placeholder="e.g. VCI Film Roll Packing"
                />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <select 
                  name="category" 
                  className="form-control" 
                  required 
                  value={form.category} 
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Caption / Project Description</label>
              <textarea 
                name="caption" 
                className="form-control" 
                rows={3} 
                value={form.caption} 
                onChange={handleInputChange} 
                placeholder="Describe this packaging project..."
              />
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label>Image File *</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="form-control" 
                  onChange={handleFileUpload} 
                />
                {uploading && <span style={{ fontSize: '0.85rem', color: 'var(--orange)' }}>Uploading image...</span>}
              </div>
              <div className="form-group">
                <label>Image Preview</label>
                {form.image ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img 
                      src={form.image.startsWith('http') ? form.image : `${API_URL}${form.image}`} 
                      alt="Preview" 
                      style={{ height: 50, width: 50, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} 
                    />
                    <span style={{ fontSize: '0.8rem', color: 'var(--grey)', wordBreak: 'break-all' }}>{form.image}</span>
                  </div>
                ) : (
                  <div style={{ height: 50, width: 50, border: '2px dashed #ddd', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifycontent: 'center', color: '#aaa', fontSize: '0.75rem', padding: '10px 0 0 10px' }}>No Image</div>
                )}
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 'var(--radius-md)', margin: '20px 0' }}>
              <h4 style={{ marginBottom: 15, fontSize: '0.95rem' }}>SEO Settings (Optional - Will auto-generate if blank)</h4>
              <div className="grid grid-2">
                <div className="form-group">
                  <label>Custom Slug</label>
                  <input 
                    type="text" 
                    name="slug" 
                    className="form-control" 
                    value={form.slug} 
                    onChange={handleInputChange} 
                    placeholder="e.g. custom-slug-value"
                  />
                </div>
                <div className="form-group">
                  <label>SEO Meta Title</label>
                  <input 
                    type="text" 
                    name="metaTitle" 
                    className="form-control" 
                    value={form.metaTitle} 
                    onChange={handleInputChange} 
                    placeholder="Search engine title tag"
                  />
                </div>
              </div>
              <div className="grid grid-2">
                <div className="form-group">
                  <label>SEO Meta Description</label>
                  <input 
                    type="text" 
                    name="metaDescription" 
                    className="form-control" 
                    value={form.metaDescription} 
                    onChange={handleInputChange} 
                    placeholder="Short description for Google search result"
                  />
                </div>
                <div className="form-group">
                  <label>Keywords</label>
                  <input 
                    type="text" 
                    name="keywords" 
                    className="form-control" 
                    value={form.keywords} 
                    onChange={handleInputChange} 
                    placeholder="comma, separated, keywords"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>
                <input 
                  type="checkbox" 
                  name="isActive" 
                  checked={form.isActive} 
                  onChange={handleInputChange} 
                  style={{ marginRight: 8 }} 
                />
                Active (Show in public gallery)
              </label>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="btn btn-primary" disabled={uploading}>
                {editing ? 'Update Item' : 'Create Item'}
              </button>
              <button type="button" className="btn btn-outline-dark" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--grey-light)', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>Image</th>
              <th style={{ padding: '12px' }}>Title</th>
              <th style={{ padding: '12px' }}>Category</th>
              <th style={{ padding: '12px' }}>Slug</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.map(img => (
              <tr key={img._id} style={{ borderBottom: '1px solid var(--grey-light)' }}>
                <td style={{ padding: '12px' }}>
                  {img.image ? (
                    <img 
                      src={img.image.startsWith('http') ? img.image : `${API_URL}${img.image}`} 
                      alt={img.title} 
                      style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} 
                    />
                  ) : (
                    <span style={{ color: 'var(--grey)' }}>No Image</span>
                  )}
                </td>
                <td style={{ padding: '12px', fontWeight: 600 }}>{img.title || 'Unnamed Item'}</td>
                <td style={{ padding: '12px', color: 'var(--grey)' }}>{img.category}</td>
                <td style={{ padding: '12px', fontSize: '0.85rem', fontFamily: 'monospace' }}>{img.slug || '-'}</td>
                <td style={{ padding: '12px' }}>
                  <span className={`badge ${img.isActive !== false ? 'badge-blue' : 'badge-orange'}`}>
                    {img.isActive !== false ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button 
                      onClick={() => editItem(img)} 
                      className="btn btn-sm btn-secondary" 
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => toggleActive(img)} 
                      className="btn btn-sm btn-outline-dark" 
                      title="Toggle Visibility"
                    >
                      {img.isActive !== false ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <button 
                      onClick={() => deleteItem(img._id)} 
                      className="btn btn-sm" 
                      style={{ background: 'var(--danger)', color: 'white', border: 'none', padding: '8px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }} 
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {images.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--grey)' }}>
                  No gallery items found. Click 'Add Gallery Item' to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
