import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddBlogs.css';
import { AppContext } from '../Context';

const AddBlogs = () => {
  const navigate = useNavigate();
  const {callblogs}=useContext(AppContext)
  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState('Coming Soon');
  const [uploading, setUploading] = useState(false);

  // Image upload to Cloudinary
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET); // replace with your preset

    try {
      const res = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setImageUrl(data.secure_url);
    } catch (err) {
      console.error(err);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  // Submit new blog
  const addBlog = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!title || !category || !description || !imageUrl || !status) {
      alert('All fields are required');
      return;
    }

    const newBlog = {
      title,
      category,
      description,
      imageUrl,
      status,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/addblog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Blog added successfully!');
        callblogs()
        navigate('/blogs');
      } else {
        alert('Failed to add blog: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Error adding blog');
    }
  };

  return (
    <div className="services-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button onClick={() => navigate("/services")} className="inactive-btn">Services</button>
        <button onClick={() => navigate("/addservice")} className="inactive-btn">Add Service</button>
        <button onClick={() => navigate("/blogs")} className="inactive-btn">Blogs</button>
        <button onClick={() => navigate("/addblog")} className="active-btn">Add Blogs</button>
       <button onClick={() => navigate("/certificates")} className="inactive-btn">
          Certificates
        </button>
        <button onClick={() => navigate("/addcertificates")} className="inactive-btn">
          Add Certificates
        </button>
      </div>

      <div className="divider"></div>

      {/* Add Blog Form */}
      <div className="blogs-container">
        <h2>Add New Blog</h2>
        <form className="edit-blog-form" onSubmit={addBlog}>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

          <label>Category</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />

          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

          <label>Image</label>
          <div className="image-preview">
            {imageUrl && <img src={imageUrl} alt="Preview" className="preview-img" />}
            <input type="file" onChange={handleImageChange} />
          </div>
          {uploading && <p style={{color:'black'}}>Uploading image...</p>}

          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="Coming Soon">Coming Soon</option>
            <option value="Active">Active</option>
          </select>

          <div className="form-buttons">
            <button type="submit" className="active-btn">Add Blog</button>
            <button type="button" onClick={() => navigate('/blogs')} className="inactive-btn">Back</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogs;
