import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEdit, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../../utils/api';

export default function AdminSections() {
  const { pageName } = useParams();
  const page = pageName || 'home';
  const [sections, setSections] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const load = () => { api.get(`/sections/admin/all/${page}`).then(r => setSections(r.data)).catch(() => {}); };
  useEffect(() => { load(); }, [page]);

  const editSection = (s) => { setEditing(s._id); setForm({ title: s.title, subtitle: s.subtitle, description: s.description, isActive: s.isActive, order: s.order }); };
  const saveSection = async () => { try { await api.put(`/sections/${editing}`, form); toast.success('Updated'); setEditing(null); load(); } catch { toast.error('Failed'); } };
  const toggleActive = async (s) => { try { await api.put(`/sections/${s._id}`, { isActive: !s.isActive }); load(); } catch {} };

  return (<div>
    <h2 style={{marginBottom:30}}>{page} Page Sections</h2>
    {sections.map(s=>(
      <div key={s._id} className="card" style={{marginBottom:16,borderLeft:`4px solid ${s.isActive?'var(--blue)':'var(--grey)'}`}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
          <div style={{flex:1}}>
            <span className={`badge ${s.isActive?'badge-blue':'badge-orange'}`}>{s.sectionKey}</span>
            {editing===s._id?(<div style={{marginTop:12}}>
              <div className="form-group"><label>Title</label><input className="form-control" value={form.title||''} onChange={e=>setForm({...form,title:e.target.value})}/></div>
              <div className="form-group"><label>Subtitle</label><input className="form-control" value={form.subtitle||''} onChange={e=>setForm({...form,subtitle:e.target.value})}/></div>
              <div className="form-group"><label>Description</label><textarea className="form-control" rows={3} value={form.description||''} onChange={e=>setForm({...form,description:e.target.value})}/></div>
              <div style={{display:'flex',gap:8}}><button onClick={saveSection} className="btn btn-primary btn-sm"><FaSave/> Save</button><button onClick={()=>setEditing(null)} className="btn btn-outline-dark btn-sm">Cancel</button></div>
            </div>):(<div style={{marginTop:8}}><h4>{s.title||'(No title)'}</h4>{s.subtitle&&<p style={{color:'var(--grey)',fontSize:'0.9rem'}}>{s.subtitle}</p>}</div>)}
          </div>
          <div style={{display:'flex',gap:8}}>
            <button onClick={()=>editSection(s)} className="btn btn-sm btn-secondary"><FaEdit/></button>
            <button onClick={()=>toggleActive(s)} className="btn btn-sm btn-outline-dark">{s.isActive?<FaEyeSlash/>:<FaEye/>}</button>
          </div>
        </div>
      </div>
    ))}
  </div>);
}
