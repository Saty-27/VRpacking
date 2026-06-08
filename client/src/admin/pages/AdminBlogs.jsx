import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaVideo, FaImage, FaEye, FaEyeSlash } from 'react-icons/fa';
import api, { API_URL } from '../../utils/api';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'General',
    excerpt: '',
    content: '',
    tags: '',
    metaTitle: '',
    metaDescription: '',
    isPublished: true,
    featuredImage: '',
    videoType: 'none',
    videoUrl: ''
  });

  const load = () => {
    api.get('/blogs/admin/all')
      .then(r => setBlogs(r.data))
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append('file', file);
    setUploadingImage(true);

    try {
      const { data } = await api.post('/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm(prev => ({
        ...prev,
        featuredImage: data.url
      }));
      toast.success('Featured image uploaded');
    } catch {
      toast.error('Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append('file', file);
    setUploadingVideo(true);

    try {
      const { data } = await api.post('/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm(prev => ({
        ...prev,
        videoUrl: data.url
      }));
      toast.success('Video file uploaded');
    } catch {
      toast.error('Video upload failed');
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      tags: typeof form.tags === 'string' 
        ? form.tags.split(',').map(t => t.trim()).filter(Boolean)
        : form.tags
    };

    try {
      if (editing) {
        await api.put(`/blogs/admin/${editing}`, data);
        toast.success('Blog post updated');
      } else {
        await api.post('/blogs/admin', data);
        toast.success('Blog post created');
      }
      resetForm();
      load();
    } catch {
      toast.error('Error saving blog post');
    }
  };

  const editBlog = (b) => {
    setForm({
      title: b.title || '',
      category: b.category || 'General',
      excerpt: b.excerpt || '',
      content: b.content || '',
      tags: (b.tags || []).join(', '),
      metaTitle: b.metaTitle || '',
      metaDescription: b.metaDescription || '',
      isPublished: b.isPublished !== false,
      featuredImage: b.featuredImage || '',
      videoType: b.videoType || 'none',
      videoUrl: b.videoUrl || ''
    });
    setEditing(b._id);
    setShowForm(true);
  };

  const deleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await api.delete(`/blogs/admin/${id}`);
      toast.success('Blog post deleted');
      load();
    } catch {
      toast.error('Failed to delete blog post');
    }
  };

  const togglePublish = async (blog) => {
    try {
      await api.put(`/blogs/admin/${blog._id}`, { isPublished: !blog.isPublished });
      toast.success('Status updated');
      load();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      category: 'General',
      excerpt: '',
      content: '',
      tags: '',
      metaTitle: '',
      metaDescription: '',
      isPublished: true,
      featuredImage: '',
      videoType: 'none',
      videoUrl: ''
    });
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h2>Blogs Manager ({blogs.length})</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
        >
          {showForm ? 'Cancel' : <><FaPlus /> Add Blog Post</>}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 30 }}>
          <h3 style={{ marginBottom: 20 }}>{editing ? 'Edit Blog Post' : 'Add New Blog Post'}</h3>
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
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input 
                  type="text"
                  name="category"
                  className="form-control" 
                  value={form.category} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Excerpt / Summary</label>
              <textarea 
                name="excerpt"
                className="form-control" 
                rows={2} 
                value={form.excerpt} 
                onChange={handleInputChange} 
              />
            </div>

            <div className="form-group">
              <label>Content (HTML format)</label>
              <textarea 
                name="content"
                className="form-control" 
                rows={8} 
                value={form.content} 
                onChange={handleInputChange} 
              />
            </div>

            {/* Media Settings: Image Upload and Video Options */}
            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 'var(--radius-md)', margin: '20px 0', border: '1px solid #e2e8f0' }}>
              <h4 style={{ marginBottom: 15, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <FaImage /> Blog Media Settings
              </h4>
              
              <div className="grid grid-2">
                <div className="form-group">
                  <label>Featured Image File</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="form-control" 
                    onChange={handleImageUpload} 
                  />
                  {uploadingImage && <span style={{ fontSize: '0.85rem', color: 'var(--orange)' }}>Uploading image...</span>}
                </div>
                <div className="form-group">
                  <label>Featured Image Preview</label>
                  {form.featuredImage ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img 
                        src={form.featuredImage.startsWith('http') ? form.featuredImage : `${API_URL}${form.featuredImage}`} 
                        alt="Featured Preview" 
                        style={{ height: 60, width: 90, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} 
                      />
                      <span style={{ fontSize: '0.8rem', color: 'var(--grey)', wordBreak: 'break-all' }}>{form.featuredImage}</span>
                    </div>
                  ) : (
                    <div style={{ height: 60, width: 90, border: '2px dashed #ddd', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '0.75rem' }}>No Image</div>
                  )}
                </div>
              </div>

              <div className="grid grid-3">
                <div className="form-group">
                  <label>Blog Format / Video Type</label>
                  <select
                    name="videoType"
                    className="form-control"
                    value={form.videoType}
                    onChange={handleInputChange}
                  >
                    <option value="none">Standard Post (Image & Text)</option>
                    <option value="youtube">YouTube Video Embedded</option>
                    <option value="local">Local Video Upload</option>
                  </select>
                </div>

                {form.videoType === 'youtube' && (
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label>YouTube Video URL *</label>
                    <input 
                      type="text"
                      name="videoUrl"
                      className="form-control"
                      placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      required={form.videoType === 'youtube'}
                      value={form.videoUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                {form.videoType === 'local' && (
                  <>
                    <div className="form-group">
                      <label>Upload Video File *</label>
                      <input 
                        type="file" 
                        accept="video/*" 
                        className="form-control" 
                        required={form.videoType === 'local' && !form.videoUrl}
                        onChange={handleVideoUpload} 
                      />
                      {uploadingVideo && <span style={{ fontSize: '0.85rem', color: 'var(--orange)' }}>Uploading video...</span>}
                    </div>
                    <div className="form-group">
                      <label>Video File URL</label>
                      <input 
                        type="text"
                        name="videoUrl"
                        className="form-control"
                        placeholder="Video URL path"
                        readOnly
                        value={form.videoUrl}
                      />
                    </div>
                  </>
                )}
              </div>

              {form.videoType !== 'none' && form.videoUrl && (
                <div style={{ marginTop: 10 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--success)' }}>
                    ✓ Video attached: {form.videoUrl}
                  </span>
                </div>
              )}
            </div>

            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 'var(--radius-md)', margin: '20px 0', border: '1px solid #e2e8f0' }}>
              <h4 style={{ marginBottom: 15, fontSize: '0.95rem' }}>SEO Settings (Optional)</h4>
              <div className="grid grid-3">
                <div className="form-group">
                  <label>Tags (comma separated)</label>
                  <input 
                    type="text"
                    name="tags"
                    className="form-control" 
                    value={form.tags} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="form-group">
                  <label>SEO Title</label>
                  <input 
                    type="text"
                    name="metaTitle"
                    className="form-control" 
                    value={form.metaTitle} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="form-group">
                  <label>SEO Description</label>
                  <input 
                    type="text"
                    name="metaDescription"
                    className="form-control" 
                    value={form.metaDescription} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>
                <input 
                  type="checkbox" 
                  name="isPublished"
                  checked={form.isPublished} 
                  onChange={handleInputChange} 
                  style={{ marginRight: 8 }} 
                />
                Published (Show in public blog list)
              </label>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="btn btn-primary" disabled={uploadingImage || uploadingVideo}>
                {editing ? 'Update Post' : 'Create Post'}
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
              <th style={{ padding: 10 }}>Media</th>
              <th style={{ padding: 10 }}>Title</th>
              <th style={{ padding: 10 }}>Category</th>
              <th style={{ padding: 10 }}>Format</th>
              <th style={{ padding: 10 }}>Status</th>
              <th style={{ padding: 10 }}>Date</th>
              <th style={{ padding: 10 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(b => (
              <tr key={b._id} style={{ borderBottom: '1px solid var(--grey-light)' }}>
                <td style={{ padding: 10 }}>
                  {b.featuredImage ? (
                    <img 
                      src={b.featuredImage.startsWith('http') ? b.featuredImage : `${API_URL}${b.featuredImage}`} 
                      alt="" 
                      style={{ width: 50, height: 35, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} 
                    />
                  ) : (
                    <div style={{ width: 50, height: 35, background: '#eee', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: '#999' }}>No Image</div>
                  )}
                </td>
                <td style={{ padding: 10, fontWeight: 600 }}>{b.title}</td>
                <td style={{ padding: 10, color: 'var(--grey)' }}>{b.category}</td>
                <td style={{ padding: 10 }}>
                  {b.videoType && b.videoType !== 'none' ? (
                    <span className="badge badge-orange" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <FaVideo size={10} /> Video ({b.videoType})
                    </span>
                  ) : (
                    <span className="badge badge-blue">Standard</span>
                  )}
                </td>
                <td style={{ padding: 10 }}>
                  <span className={`badge ${b.isPublished ? 'badge-blue' : 'badge-orange'}`}>
                    {b.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td style={{ padding: 10, color: 'var(--grey)', fontSize: '0.85rem' }}>
                  {new Date(b.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: 10 }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => editBlog(b)} className="btn btn-sm btn-secondary" title="Edit"><FaEdit /></button>
                    <button 
                      onClick={() => togglePublish(b)} 
                      className="btn btn-sm btn-outline-dark" 
                      title="Toggle Visibility"
                    >
                      {b.isPublished ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <button 
                      onClick={() => deleteBlog(b._id)} 
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
            {blogs.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--grey)' }}>
                  No blog posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
