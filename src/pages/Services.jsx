import React, { useContext, useState } from "react";
import { AppContext } from "../Context";
import "./Services.css"; // css import
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [selectedCountry, setSelectedCountry] = useState("All");
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
        {/* Country Filter - derived from services */}
        <div className="country-filters">
          {(() => {
            const getCountryName = (s) => {
              if (!s || s.country === undefined || s.country === null) return "Unknown";
              if (typeof s.country === "string") return s.country;
              if (typeof s.country === "object") {
                if (s.country.name) return s.country.name;
                if (s.country.country) return s.country.country;
                return String(s.country);
              }
              return String(s.country);
            };

            const unique = Array.from(
              new Set(services.map((s) => getCountryName(s) || "Unknown")),
            );
            unique.sort();
            return ["All", ...unique].map((c) => (
              <button
                key={c}
                className={selectedCountry === c ? "filter-btn active" : "filter-btn"}
                onClick={() => setSelectedCountry(c)}
              >
                {c === "All" ? "All Countries" : c}
              </button>
            ));
          })()}
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services
            .filter((s) => {
              if (selectedCountry === "All") return true;
              const getCountryName = (item) => {
                if (!item || item.country === undefined || item.country === null) return "Unknown";
                if (typeof item.country === "string") return item.country;
                if (typeof item.country === "object") {
                  if (item.country.name) return item.country.name;
                  if (item.country.country) return item.country.country;
                  return String(item.country);
                }
                return String(item.country);
              };
              return getCountryName(s).toLowerCase() === selectedCountry.toLowerCase();
            })
            .map((service) => {
              const getCountryName = (item) => {
                if (!item || item.country === undefined || item.country === null) return "Unknown";
                if (typeof item.country === "string") return item.country;
                if (typeof item.country === "object") {
                  if (item.country.name) return item.country.name;
                  if (item.country.country) return item.country.country;
                  return String(item.country);
                }
                return String(item.country);
              };

              const countryLabel = getCountryName(service);

              return (
                <div className="service-card" key={service._id}>
                  <img src={service.imageUrl} alt={service.title} />
                  <h3>{service.title}</h3>
                  <span className="country-tag">{countryLabel}</span>
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
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Services;
