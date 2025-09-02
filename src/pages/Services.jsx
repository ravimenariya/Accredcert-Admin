import React, { useContext, useState } from "react";
import { AppContext } from "../Context";
import "./Services.css"; // css import
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [selectedCountry, setSelectedCountry] = useState("USA");
  const { services } = useContext(AppContext);
  const navigate = useNavigate();
  const { callservices } = useContext(AppContext);
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/deleteservice/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete service");
      }

      const result = await response.json();
      console.log("Deleted:", result);
      callservices();
    } catch (err) {
      console.error("Error deleting service:", err);
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
          className="active-btn"
        >
          Services
        </button>
        <button
          onClick={() => {
            navigate("/addservice");
          }}
          className="inactive-btn"
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
        <button onClick={() => navigate("/addblog")} className="inactive-btn">
          Add Blogs
        </button>
        <button
          onClick={() => navigate("/certificates")}
          className="inactive-btn"
        >
          Certificates
        </button>
        <button
          onClick={() => navigate("/addcertificates")}
          className="inactive-btn"
        >
          Add Certificates
        </button>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Main Content */}
      <div className="main-content">
        {/* Country Filter */}
        <div className="country-filters">
          <button
            className={
              selectedCountry === "USA" ? "filter-btn active" : "filter-btn"
            }
            onClick={() => setSelectedCountry("USA")}
          >
            United States
          </button>
          <button
            className={
              selectedCountry === "India" ? "filter-btn active" : "filter-btn"
            }
            onClick={() => setSelectedCountry("India")}
          >
            India
          </button>
          <button
            className={
              selectedCountry === "Global" ? "filter-btn active" : "filter-btn"
            }
            onClick={() => setSelectedCountry("Global")}
          >
            Global Services
          </button>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services
            .filter(
              (s) => s.country.toLowerCase() === selectedCountry.toLowerCase(),
            )
            .map((service, idx) => (
              <div className="service-card" key={idx}>
                <img src={service.imageUrl} alt={service.title} />
                <h3>{service.title}</h3>
                <span className="country-tag">{service.country}</span>
                <div className="button-group">
                  <button
                    onClick={() =>
                      navigate(`/services/${service._id}`, { state: service })
                    }
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
