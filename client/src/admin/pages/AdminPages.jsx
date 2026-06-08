import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaFileAlt } from 'react-icons/fa';
import api from '../../utils/api';

export default function AdminPages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);
    api.get('/pages')
      .then(r => setPages(r.data))
      .catch(() => toast.error('Failed to load pages'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const togglePageActive = async (page) => {
    try {
      await api.put(`/pages/${page._id}`, { isActive: !page.isActive });
      toast.success(`Status updated for ${page.pageName}`);
      load();
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h2>Pages Manager ({pages.length})</h2>
        <span style={{ color: 'var(--grey)', fontSize: '0.9rem' }}>
          Disable a page to hide it from navigation and block user access on the public site.
        </span>
      </div>

      <div className="card">
        {loading ? (
          <div className="loading"><div className="spinner" /></div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--grey-light)', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px' }}>Page Name</th>
                <th style={{ padding: '12px 16px' }}>Slug / Path</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map(page => (
                <tr key={page._id} style={{ borderBottom: '1px solid var(--grey-light)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <FaFileAlt style={{ color: 'var(--blue)' }} />
                    {page.pageName}
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                    {page.slug}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span className={`badge ${page.isActive !== false ? 'badge-blue' : 'badge-orange'}`}>
                      {page.isActive !== false ? 'Active (Enabled)' : 'Disabled (Hidden)'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <button 
                      onClick={() => togglePageActive(page)} 
                      className={`btn btn-sm ${page.isActive !== false ? 'btn-outline-dark' : 'btn-primary'}`}
                      style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6, borderRadius: 'var(--radius-sm)' }}
                      title={page.isActive !== false ? 'Disable Page' : 'Enable Page'}
                    >
                      {page.isActive !== false ? (
                        <><FaEyeSlash /> Disable</>
                      ) : (
                        <><FaEye /> Enable</>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
              {pages.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: 24, textAlign: 'center', color: 'var(--grey)' }}>
                    No pages found. Seed the database to populate page configurations.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
