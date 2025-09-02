import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Blog.css';
import { AppContext } from '../Context';

const EditBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const blog = location.state?.blog;
  const {callblogs}=useContext(AppContext)
  const [title, setTitle] = useState(blog?.title || '');
  const [category, setCategory] = useState(blog?.category || '');
  const [description, setDescription] = useState(blog?.description || '');
  const [imageUrl, setImageUrl] = useState(blog?.imageUrl || '');
  const [status, setStatus] = useState(blog?.status || '');
  const [uploading, setUploading] = useState(false);

  // Handle image upload to Cloudinary
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
      setImageUrl(data.secure_url); // Set the uploaded image URL
    } catch (err) {
      console.error('Image upload error:', err);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/editblog`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: blog._id,
          title,
          category,
          description,
          imageUrl,
          status,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Blog updated successfully!');
        callblogs()
        navigate('/blogs');
      } else {
        alert('Failed to update blog: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Error updating blog');
    }
  };

  return (
    <div className="services-container">
      <div className="sidebar">
        <button onClick={() => navigate("/services")} className="inactive-btn">Services</button>
        <button onClick={() => navigate("/addservice")} className="inactive-btn">Add Service</button>
        <button onClick={() => navigate("/blogs")} className="active-btn">Blogs</button>
        <button onClick={() => navigate("/addblog")} className="inactive-btn">Add Blogs</button>
       <button onClick={() => navigate("/certificates")} className="inactive-btn">
          Certificates
        </button>
        <button onClick={() => navigate("/addcertificates")} className="inactive-btn">
          Add Certificates
        </button>
      </div>

      <div className="divider"></div>

      <div className="blogs-container">
        <h2>Edit Blog</h2>
        <form className="edit-blog-form" onSubmit={handleSubmit}>

          <label>Image</label>
          <div className="image-preview">
            {imageUrl && <img src={imageUrl} alt="Preview" className="preview-img" />}
            <input type="file" onChange={handleImageChange} />
          </div>
          {uploading && <p style={{color:'black'}}>Uploading image...</p>}

          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

          <label>Category</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />

          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="Coming Soon">Coming Soon</option>
            <option value="Active">Active</option>
          </select>

          <div className="form-buttons">
            <button type="submit" className="active-btn">Save Changes</button>
            <button type="button" onClick={() => navigate('/blogs')} className="inactive-btn">Back</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
