import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaVideo } from 'react-icons/fa';
import api, { API_URL } from '../../utils/api';

export default function AdminVideoGallery() {
  const [videos, setVideos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  
  const [form, setForm] = useState({
    title: '',
    category: '',
    caption: '',
    image: '',
    mediaType: 'video',
    videoType: 'youtube', // 'youtube' or 'local'
    videoUrl: '',
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
      .then(r => {
        // Filter only video items
        setVideos(r.data.filter(item => item.mediaType === 'video'));
      })
      .catch(() => {});
  };

  useEffect(() => {
    load();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };
      
      // Clear videoUrl if source changes to avoid mixing values
      if (name === 'videoType') {
        updated.videoUrl = '';
      }
      
      return updated;
    });
  };

  const handleFileUpload = async (e) => {
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
        image: data.url
      }));
      toast.success('Thumbnail uploaded successfully');
    } catch {
      toast.error('Thumbnail upload failed');
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
        videoUrl: data.url,
        title: prev.title || file.name.replace(/\.[^/.]+$/, "")
      }));
      toast.success('Video file uploaded successfully');
    } catch {
      toast.error('Video upload failed');
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.videoUrl) {
      toast.error('Please upload a video or provide a YouTube URL');
      return;
    }

    try {
      const payload = { ...form, mediaType: 'video' };
      if (editing) {
        await api.put(`/gallery/admin/${editing}`, payload);
        toast.success('Video gallery item updated');
      } else {
        await api.post('/gallery/admin', payload);
        toast.success('Video gallery item created');
      }
      
      resetForm();
      load();
    } catch {
      toast.error('Error saving video gallery item');
    }
  };

  const editItem = (vid) => {
    setForm({
      title: vid.title || '',
      category: vid.category || '',
      caption: vid.caption || '',
      image: vid.image || '',
      mediaType: 'video',
      videoType: vid.videoType || 'youtube',
      videoUrl: vid.videoUrl || '',
      slug: vid.slug || '',
      metaTitle: vid.metaTitle || '',
      metaDescription: vid.metaDescription || '',
      keywords: vid.keywords || '',
      isActive: vid.isActive !== false
    });
    setEditing(vid._id);
    setShowForm(true);
  };

  const toggleActive = async (vid) => {
    try {
      await api.put(`/gallery/admin/${vid._id}`, { isActive: !vid.isActive });
      toast.success('Status updated');
      load();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video gallery item?')) return;
    try {
      await api.delete(`/gallery/admin/${id}`);
      toast.success('Video gallery item deleted');
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
      mediaType: 'video',
      videoType: 'youtube',
      videoUrl: '',
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
        <h2>Video Gallery Manager ({videos.length})</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
        >
          {showForm ? 'Cancel' : <><FaPlus /> Add Video Item</>}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 30 }}>
          <h3 style={{ marginBottom: 20 }}>{editing ? 'Edit Video Item' : 'Add New Video Item'}</h3>
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
                  placeholder="e.g. VCI Film Roll Packing Showcase"
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

            {/* Video specifics */}
            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 'var(--radius-md)', margin: '20px 0', border: '1px solid #e2e8f0' }}>
              <h4 style={{ marginBottom: 15, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <FaVideo /> Video Upload Details
              </h4>

              <div className="grid grid-3">
                <div className="form-group">
                  <label>Video Source</label>
                  <select 
                    name="videoType" 
                    className="form-control" 
                    value={form.videoType} 
                    onChange={handleInputChange}
                  >
                    <option value="youtube">YouTube Embed Link</option>
                    <option value="local">Local Video File Upload</option>
                  </select>
                </div>

                {form.videoType === 'youtube' && (
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label>YouTube URL *</label>
                    <input 
                      type="text" 
                      name="videoUrl" 
                      className="form-control" 
                      required={form.videoType === 'youtube'}
                      value={form.videoUrl} 
                      onChange={handleInputChange} 
                      placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    />
                  </div>
                )}

                {form.videoType === 'local' && (
                  <>
                    <div className="form-group">
                      <label>Upload Video *</label>
                      <input 
                        type="file" 
                        accept="video/*" 
                        className="form-control" 
                        required={!form.videoUrl}
                        onChange={handleVideoUpload} 
                      />
                      {uploadingVideo && <span style={{ fontSize: '0.85rem', color: 'var(--orange)' }}>Uploading video...</span>}
                    </div>
                    <div className="form-group">
                      <label>Local Video Path</label>
                      <input 
                        type="text" 
                        name="videoUrl" 
                        className="form-control" 
                        readOnly 
                        value={form.videoUrl} 
                        placeholder="Upload file above"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="grid grid-2" style={{ marginTop: 15 }}>
                <div className="form-group">
                  <label>Optional Video Thumbnail Image</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="form-control" 
                    onChange={handleFileUpload} 
                  />
                  {uploadingImage && <span style={{ fontSize: '0.85rem', color: 'var(--orange)' }}>Uploading image...</span>}
                </div>
                <div className="form-group">
                  <label>Thumbnail Preview</label>
                  {form.image ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img 
                        src={form.image.startsWith('http') ? form.image : `${API_URL}${form.image}`} 
                        alt="Preview" 
                        style={{ height: 60, width: 80, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} 
                      />
                      <span style={{ fontSize: '0.8rem', color: 'var(--grey)', wordBreak: 'break-all' }}>{form.image}</span>
                    </div>
                  ) : (
                    <div style={{ height: 60, width: 80, border: '2px dashed #ddd', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '0.75rem' }}>Default Icon</div>
                  )}
                </div>
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
                placeholder="Describe this packaging project video..."
              />
            </div>

            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 'var(--radius-md)', margin: '20px 0', border: '1px solid #e2e8f0' }}>
              <h4 style={{ marginBottom: 15, fontSize: '0.95rem' }}>SEO Settings (Optional)</h4>
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
                Active (Show in public video gallery)
              </label>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="btn btn-primary" disabled={uploadingImage || uploadingVideo}>
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
              <th style={{ padding: '12px' }}>Thumbnail</th>
              <th style={{ padding: '12px' }}>Title</th>
              <th style={{ padding: '12px' }}>Category</th>
              <th style={{ padding: '12px' }}>Source</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map(vid => (
              <tr key={vid._id} style={{ borderBottom: '1px solid var(--grey-light)' }}>
                <td style={{ padding: '12px' }}>
                  {vid.image ? (
                    <img 
                      src={vid.image.startsWith('http') ? vid.image : `${API_URL}${vid.image}`} 
                      alt="" 
                      style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} 
                    />
                  ) : (
                    <div style={{ width: 50, height: 50, background: '#111827', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff751a' }}>
                      <FaVideo size={18} />
                    </div>
                  )}
                </td>
                <td style={{ padding: '12px', fontWeight: 600 }}>{vid.title || 'Unnamed Video'}</td>
                <td style={{ padding: '12px', color: 'var(--grey)' }}>{vid.category}</td>
                <td style={{ padding: '12px' }}>
                  <span className="badge badge-orange" style={{ textTransform: 'capitalize' }}>
                    {vid.videoType || 'YouTube'}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <span className={`badge ${vid.isActive !== false ? 'badge-blue' : 'badge-orange'}`}>
                    {vid.isActive !== false ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button 
                      onClick={() => editItem(vid)} 
                      className="btn btn-sm btn-secondary" 
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => toggleActive(vid)} 
                      className="btn btn-sm btn-outline-dark" 
                      title="Toggle Visibility"
                    >
                      {vid.isActive !== false ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <button 
                      onClick={() => deleteItem(vid._id)} 
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
            {videos.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--grey)' }}>
                  No video items found. Click 'Add Video Item' to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
