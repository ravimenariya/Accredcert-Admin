import React, { useContext, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./Service.css";
import { AppContext } from "../Context";
const Service = () => {
  const navigate=useNavigate()
  const { id } = useParams();
  const location = useLocation();
  const service = location.state;
  const {callservices}=useContext(AppContext)
  if (!service) {
    return <h2>No service found with ID: {id}</h2>;
  }

  // ✅ Har ek field ki alag state
  const [title, setTitle] = useState(service.title);
  const [description, setDescription] = useState(service.description);
  const [category, setCategory] = useState(service.category);
  const [country, setCountry] = useState(service.country);
  const [isActive, setIsActive] = useState(service.isActive);
  const [createdAt, setCreatedAt] = useState(service.createdAt);
  const [updatedAt, setUpdatedAt] = useState(service.updatedAt);
  const [_id] = useState(service._id);
  const [imageUrl, setImageUrl] = useState(service.imageUrl);

  const [uploading, setUploading] = useState(false);

  // ✅ Image upload to Cloudinary
const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setUploading(true);

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET); // ✅

  try {
    const res = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    console.log("Cloudinary Response:", result);

    if (result.secure_url) {
      setImageUrl(result.secure_url); // ✅ final Cloudinary url
    } else {
      alert("Image upload failed: " + JSON.stringify(result));
    }

    callservices()
  } catch (err) {
    console.error("Image upload failed:", err);
  }

  setUploading(false);




};


  // ✅ Edit handler
  const handleEdit = async() => {
    const updatedData = {
      title,
      description,
      category,
      country,
      isActive,
      createdAt,
      updatedAt,
      _id,
      imageUrl, // ✅ Cloudinary URL
    };
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/editservice`, {
        method: "PUT", // ya POST agar tumhare backend me POST hai
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();
      console.log("Edit Response:", result);

      if (response.ok) {
        alert("Edited Successfully ✅");
      } else {
        alert("Failed to edit ❌: " + result.message);
      }
    } catch (error) {
      console.error("Error while editing:", error);
      alert("Something went wrong ❌");
    }
    
  };

  return (
    <div className="services-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button onClick={()=>{navigate('/services')}} className="active-btn">Services</button>
        <button onClick={()=>{navigate('/addservice')}} className="inactive-btn">Add Service</button>
        <button onClick={()=>{navigate('/blogs')}}className="inactive-btn">Blogs</button>
        <button onClick={()=>navigate('/addblog')} className="inactive-btn">Add Blogs</button>
        <button onClick={() => navigate("/certificates")} className="inactive-btn">
          Certificates
        </button>
        <button onClick={() => navigate("/addcertificates")} className="inactive-btn">
          Add Certificates
        </button>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Main Content */}
      <div className="service-detail-container">
        <div className="service-card-detail">
          {/* ✅ Image Preview */}
          <img src={imageUrl} alt={title} className="service-detail-img" />

          {/* ✅ File Input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="input-field"
          />
          {uploading && <p style={{ color: "gray" }}>Uploading...</p>}

          <div className="service-detail-content">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              placeholder="Enter Title"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field"
              placeholder="Enter Description"
            />

            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
              placeholder="Enter Category"
            />

            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="input-field"
              placeholder="Enter Country"
            />

            <label className="status-label">
              Status:
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />{" "}
              Active
            </label>

            <label style={{ color: "black" }}>Created At:</label>
            <input
              type="text"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              className="input-field"
            />

            <label style={{ color: "black" }}>Updated At:</label>
            <input
              type="text"
              value={updatedAt}
              onChange={(e) => setUpdatedAt(e.target.value)}
              className="input-field"
            />

            <button onClick={handleEdit} className="edit-btn">
              Edit
            </button>
            <button onClick={()=>navigate('/services')} className="edit-btn">
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
