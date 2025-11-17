import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Addservice.css';

export default function Countries(){
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [newName, setNewName] = useState('');
  const [editing, setEditing] = useState({});
  const [mergeSource, setMergeSource] = useState(null);
  const [mergeTarget, setMergeTarget] = useState(null);

  const fetch = async ()=>{
    try{
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/getcountries`);
      setCountries(res.data || []);
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{ fetch(); },[]);

  const create = async ()=>{
    if(!newName) return;
    try{
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/createcountry`, { name: newName });
      setNewName('');
      fetch();
    }catch(err){ console.error(err); alert(err.response?.data?.message || 'Error'); }
  }

  const save = async (id)=>{
    try{
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/updatecountry/${id}`, { name: editing[id] });
      setEditing({...editing, [id]: undefined});
      fetch();
    }catch(err){ console.error(err); alert(err.response?.data?.message || 'Error'); }
  }

  const remove = async (id)=>{
    if(!confirm('Delete this country?')) return;
    try{
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/admin/deletecountry/${id}`);
      fetch();
    }catch(err){ console.error(err); alert(err.response?.data?.message || 'Error'); }
  }

  const doMerge = async ()=>{
    if(!mergeSource || !mergeTarget) return alert('Select source and target');
    if(mergeSource === mergeTarget) return alert('Source and target must differ');
    if(!confirm('Merge will reassign services from source to target and delete source. Proceed?')) return;
    try{
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/mergecountries`, { sourceId: mergeSource, targetId: mergeTarget });
      setMergeSource(null); setMergeTarget(null);
      fetch();
      alert('Merged');
    }catch(err){ console.error(err); alert(err.response?.data?.message || 'Error'); }
  }

  return (
    <div className="services-container">
      <div className="sidebar">
        <button onClick={()=>navigate('/services')} className="inactive-btn">Services</button>
        <button onClick={()=>navigate('/addservice')} className="inactive-btn">Add Service</button>
        <button onClick={()=>navigate('/blogs')} className="inactive-btn">Blogs</button>
        <button onClick={()=>navigate('/countries')} className="active-btn">Countries</button>
      </div>
      <div className="divider"></div>
      <div className="form-container">
        <h2>Manage Countries</h2>
        <div style={{marginBottom:20}}>
          <input value={newName} onChange={(e)=>setNewName(e.target.value)} placeholder="New country name" />
          <button onClick={create} className="submit-btn">Create</button>
        </div>

        <table style={{width:'100%', borderCollapse:'collapse'}}>
          <thead>
            <tr>
              <th style={{textAlign:'left'}}>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {countries.map(c=> (
              <tr key={c._id} style={{borderTop:'1px solid #eee'}}>
                <td>
                  <input value={editing[c._id] ?? c.name} onChange={(e)=>setEditing({...editing, [c._id]: e.target.value})} />
                </td>
                <td>
                  <button onClick={()=>save(c._id)} className="submit-btn">Save</button>
                  <button onClick={()=>remove(c._id)} style={{marginLeft:8}} className="inactive-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{marginTop:30}}>
          <h3>Merge Countries</h3>
          <div>
            <select value={mergeSource||''} onChange={(e)=>setMergeSource(e.target.value)}>
              <option value="">Select source</option>
              {countries.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <select value={mergeTarget||''} onChange={(e)=>setMergeTarget(e.target.value)} style={{marginLeft:8}}>
              <option value="">Select target</option>
              {countries.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <button onClick={doMerge} className="submit-btn" style={{marginLeft:8}}>Merge</button>
          </div>
        </div>
      </div>
    </div>
  )
}
