import { useState } from 'react';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import './InquiryModal.css';

export default function InquiryModal({ isOpen, onClose, defaultProduct = '' }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', companyName: '', productInterested: defaultProduct, message: '' });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/inquiries', form);
      toast.success('Inquiry submitted successfully! We will contact you soon.');
      setForm({ name: '', email: '', phone: '', companyName: '', productInterested: defaultProduct, message: '' });
      onClose();
    } catch (err) {
      toast.error('Failed to submit inquiry. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><FaTimes /></button>
        <div className="modal-header">
          <h2>Request a Quote</h2>
          <p>Please fill out the form below to get a quote for {defaultProduct || 'our products'}.</p>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Name *</label>
            <input className="form-control" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your Name" />
          </div>
          <div className="grid grid-2" style={{ gap: '16px' }}>
            <div className="form-group">
              <label>Email *</label>
              <input type="email" className="form-control" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input type="tel" className="form-control" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" />
            </div>
          </div>
          <div className="form-group">
            <label>Company Name</label>
            <input className="form-control" value={form.companyName} onChange={e => setForm({ ...form, companyName: e.target.value })} placeholder="Your Company" />
          </div>
          <div className="form-group">
            <label>Requirement / Message</label>
            <textarea className="form-control" rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your requirements..."></textarea>
          </div>
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
            <FaPaperPlane /> {loading ? 'Submitting...' : 'Submit Inquiry'}
          </button>
        </form>
      </div>
    </div>
  );
}
