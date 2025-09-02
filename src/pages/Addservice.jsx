import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Addservice.css";
import axios from "axios";
import { AppContext } from "../Context";
const Addservice = () => {
  const navigate = useNavigate();
  const { callservices } = useContext(AppContext)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    country: "",
    isActive: false,
    createdAt: "",
    updatedAt: "",
    imageUrl: "",
  });

  const [uploading, setUploading] = useState(false); // 👈 new state

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET); // replace with your preset

    try {
      setUploading(true);
      const res = await axios.post(
        import.meta.env.VITE_CLOUDINARY_URL,
        data
      );
      setFormData({ ...formData, imageUrl: res.data.secure_url });
    } catch (err) {
      console.error("Image upload error:", err);
    } finally {
      setUploading(false); // 👈 Stop uploading
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/addservice`, payload);
      alert("Service added successfully!");
      callservices()
      navigate("/services");
    } catch (err) {
      console.error("Error saving service:", err);
    }
  };
  return (
    <div className="services-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button
          onClick={() => {
            navigate("/services");
          }}
          className="inactive-btn"
        >
          Services
        </button>
        <button
          onClick={() => {
            navigate("/addservice");
          }}
          className="active-btn"
        >
          Add Service
        </button>
        <button
          onClick={() => {
            navigate("/blogs");
          }}
          className="inactive-btn"
        >
          Blogs
        </button>
        <button
          onClick={() => navigate("/addblog")}
          className="inactive-btn"
        >
          Add Blogs
        </button>
        <button onClick={() => navigate("/certificates")} className="inactive-btn">
          Certificates
        </button>
        <button onClick={() => navigate("/addcertificates")} className="inactive-btn">
          Add Certificates
        </button>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Form */}
      <div className="form-container">
        <h2>Add New Service</h2>
        <form onSubmit={handleSubmit} className="service-form">

          <label>Image:</label>
          <input type="file" onChange={handleImageUpload} accept="image/*" />
          {/* 👇 Show Uploading OR Image */}
          {uploading ? (
            <p style={{ color: "blue", fontWeight: "bold" }}>Uploading...</p>
          ) : (
            formData.imageUrl && (
              <img src={formData.imageUrl} alt="preview" width="100" />
            )
          )}

          <label>
            Title
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
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
            />
          </label>

          <label>
            Country
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            Active
          </label>

          <label>
            Created At
            <input
              type="date"
              name="createdAt"
              value={formData.createdAt}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Updated At
            <input
              type="date"
              name="updatedAt"
              value={formData.updatedAt}
              onChange={handleChange}
            />
          </label>


          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addservice;
