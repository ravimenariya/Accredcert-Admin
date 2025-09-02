import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Blogs.css';
import { AppContext } from '../Context';

const Blogs = () => {
  const navigate = useNavigate();
  const { blogs,callblogs} = useContext(AppContext);

   const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this blog?")) return;

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/deleteblog/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (response.ok) {
      alert("Blog deleted successfully!");
      callblogs()
      // Option 1: Refresh blogs from context API (if you have a fetchBlogs function)
    } else {
      alert("Failed to delete blog: " + data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Error deleting blog");
  }
};


  return (
    <div className="services-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button onClick={() => navigate("/services")} className="inactive-btn">
          Services
        </button>
        <button onClick={() => navigate("/addservice")} className="inactive-btn">
          Add Service
        </button>
        <button onClick={() => navigate("/blogs")} className="active-btn">
          Blogs
        </button>
        <button onClick={() => navigate("/addblog")} className="inactive-btn">
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

      {/* Blog Cards */}
      <div className="blogs-container">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <img src={blog.imageUrl} alt={blog.title} className="blog-image" />
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-category">{blog.category}</p>
              <p className="blog-description">{blog.description}</p>
              <span className={`blog-status ${blog.status === "Coming Soon" ? "coming-soon" : "active"}`}>
                {blog.status}
              </span>
            <br></br>
              <div className="button-group">
                <button onClick={()=> navigate(`/blogs/:${blog._id}`, { state: { blog: blog } })} className="edit-btn">Edit</button>
                 <button onClick={()=>{handleDelete(blog._id)}} className="delete-btn">Delete</button>
                </div>
            </div>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
