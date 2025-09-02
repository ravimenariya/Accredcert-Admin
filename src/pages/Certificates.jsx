import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Certificates.css'
import { AppContext } from '../Context'

const Certificates = () => {
  const navigate = useNavigate()
  const {callcertificates}=useContext(AppContext)
  const { certificate } = useContext(AppContext)
  
    const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this certificate?")
    if (!confirmDelete) return

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/admin/deletecertificate/${id}`)
      alert("Certificate deleted successfully!")
      callcertificates()
    } catch (error) {
      console.error("Error deleting certificate:", error)
      alert("Failed to delete certificate")
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
        <button onClick={() => navigate("/certificates")} className="active-btn">Certificates</button>
        <button onClick={() => navigate("/addcertificates")} className="inactive-btn">Add Certificates</button>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Table Container */}
      <div className="table-container">
        <table className="certificates-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Category</th>
              <th>Certificate Number</th>
              <th>Issue Date</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {certificate.map(cert => (
              <tr key={cert._id}>
                <td>{cert.customerName}</td>
                <td>{cert.email}</td>
                <td>{cert.category}</td>
                <td>{cert.certificateNumber}</td>
                <td>{new Date(cert.issueDate).toLocaleDateString()}</td>
                <td>{new Date(cert.expiryDate).toLocaleDateString()}</td>
                 <td>
                  <button 
                    onClick={() => handleDelete(cert._id)} 
                    style={{
                      backgroundColor: '#ff4d4f',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Certificates
