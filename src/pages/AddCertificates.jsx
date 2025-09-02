import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../Context'

const AddCertificates = () => {
  const navigate = useNavigate()
  const {callcertificates}=useContext(AppContext)
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    category: '',
    certificateNumber: '',
    issueDate: '',
    expiryDate: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/addcertificate`, formData)
      alert('Certificate added successfully!')
      callcertificates()
      navigate('/certificates')
    } catch (error) {
      console.error('Error adding certificate:', error)
      alert('Failed to add certificate')
    }
  }

  return (
    <div className="services-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button onClick={() => navigate("/services")} className="inactive-btn">Services</button>
        <button onClick={() => navigate("/addservice")} className="inactive-btn">Add Service</button>
        <button onClick={() => navigate("/blogs")} className="inactive-btn">Blogs</button>
        <button onClick={() => navigate("/addblog")} className="inactive-btn">Add Blogs</button>
        <button onClick={() => navigate("/certificates")} className="inactive-btn">Certificates</button>
        <button onClick={() => navigate("/addcertificates")} className="active-btn">Add Certificates</button>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Form */}
      <div className="table-container">
       <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
  <label>
    Customer Name
    <input 
      type="text" 
      name="customerName" 
      value={formData.customerName} 
      onChange={handleChange} 
      required 
      style={{ padding: '10px 12px', fontSize: '15px', borderRadius: '6px', border: '1px solid #ccc' }}
    />
  </label>

  <label>
    Email
    <input 
      type="email" 
      name="email" 
      value={formData.email} 
      onChange={handleChange} 
      required 
      style={{ padding: '10px 12px', fontSize: '15px', borderRadius: '6px', border: '1px solid #ccc' }}
    />
  </label>

  <label>
    Category
    <input 
      type="text" 
      name="category" 
      value={formData.category} 
      onChange={handleChange} 
      required 
      style={{ padding: '10px 12px', fontSize: '15px', borderRadius: '6px', border: '1px solid #ccc' }}
    />
  </label>

  <label>
    Certificate Number
    <input 
      type="text" 
      name="certificateNumber" 
      value={formData.certificateNumber} 
      onChange={handleChange} 
      required 
      style={{ padding: '10px 12px', fontSize: '15px', borderRadius: '6px', border: '1px solid #ccc' }}
    />
  </label>

  <label>
    Issue Date
    <input 
      type="date" 
      name="issueDate" 
      value={formData.issueDate} 
      onChange={handleChange} 
      required 
      style={{ padding: '10px 12px', fontSize: '15px', borderRadius: '6px', border: '1px solid #ccc' }}
    />
  </label>

  <label>
    Expiry Date
    <input 
      type="date" 
      name="expiryDate" 
      value={formData.expiryDate} 
      onChange={handleChange} 
      required 
      style={{ padding: '10px 12px', fontSize: '15px', borderRadius: '6px', border: '1px solid #ccc' }}
    />
  </label>

  <button type="submit" style={{
    backgroundColor: '#0f3460',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    width:'400px'
  }}>
    Add Certificate
  </button>
</form>

      </div>
    </div>
  )
}

export default AddCertificates
