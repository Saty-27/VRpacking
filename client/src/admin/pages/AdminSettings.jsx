import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaSave } from 'react-icons/fa';
import api from '../../utils/api';

export default function AdminSettings() {
  const [settings, setSettings] = useState({ companyName: '', tagline: '', phone: '', whatsapp: '', email: '', address: '', mapIframe: '', footerDescription: '', copyrightText: '', socialLinks: { facebook: '', linkedin: '', instagram: '', twitter: '', youtube: '' } });

  useEffect(() => { api.get('/settings').then(r => setSettings({ ...settings, ...r.data })).catch(() => {}); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try { await api.put('/settings/admin', settings); toast.success('Settings saved!'); } catch { toast.error('Save failed'); }
  };

  const updateSocial = (key, value) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, [key]: value } });

  return (<div>
    <h2 style={{ marginBottom: 30 }}>Site Settings</h2>
    <form onSubmit={handleSave}>
      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ marginBottom: 16 }}>General</h3>
        <div className="grid grid-2">
          <div className="form-group"><label>Company Name</label><input className="form-control" value={settings.companyName} onChange={e => setSettings({ ...settings, companyName: e.target.value })} /></div>
          <div className="form-group"><label>Tagline</label><input className="form-control" value={settings.tagline} onChange={e => setSettings({ ...settings, tagline: e.target.value })} /></div>
        </div>
        <div className="grid grid-3">
          <div className="form-group"><label>Phone</label><input className="form-control" value={settings.phone} onChange={e => setSettings({ ...settings, phone: e.target.value })} /></div>
          <div className="form-group"><label>WhatsApp Number</label><input className="form-control" value={settings.whatsapp} onChange={e => setSettings({ ...settings, whatsapp: e.target.value })} /></div>
          <div className="form-group"><label>Email</label><input className="form-control" value={settings.email} onChange={e => setSettings({ ...settings, email: e.target.value })} /></div>
        </div>
        <div className="form-group"><label>Address</label><textarea className="form-control" rows={2} value={settings.address} onChange={e => setSettings({ ...settings, address: e.target.value })} /></div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ marginBottom: 16 }}>Footer</h3>
        <div className="form-group"><label>Footer Description</label><textarea className="form-control" rows={3} value={settings.footerDescription} onChange={e => setSettings({ ...settings, footerDescription: e.target.value })} /></div>
        <div className="form-group"><label>Copyright Text</label><input className="form-control" value={settings.copyrightText} onChange={e => setSettings({ ...settings, copyrightText: e.target.value })} /></div>
        <div className="form-group"><label>Google Map Iframe</label><textarea className="form-control" rows={3} value={settings.mapIframe} onChange={e => setSettings({ ...settings, mapIframe: e.target.value })} /></div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ marginBottom: 16 }}>Social Links</h3>
        <div className="grid grid-3">
          {['facebook', 'linkedin', 'instagram', 'twitter', 'youtube'].map(key => (
            <div className="form-group" key={key}><label style={{ textTransform: 'capitalize' }}>{key}</label><input className="form-control" value={settings.socialLinks?.[key] || ''} onChange={e => updateSocial(key, e.target.value)} /></div>
          ))}
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-lg"><FaSave /> Save Settings</button>
    </form>
  </div>);
}
