// BlogList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/blogList.css'; // Import custom styles if needed

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useNavigate();

  const handleEdit = (blogId) => {
    history(`/edit-blog/${blogId}`); // Navigate to the edit page
  };

  const handleUnpublish = async (blogId) => {
    if (window.confirm('Are you sure you want to unpublish this blog?')) {
      try {
        const response = await axios.patch(
          `https://serve-d3eo.onrender.com/api/blogs/unpublish/${blogId}`,
          {}, // Empty object as request body (optional)
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
  
        alert('Blog unpublished successfully!');
        // Optionally, refresh the blog list or update the UI
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to unpublish the blog. Please try again.');
      }
    }
  };
  

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://serve-d3eo.onrender.com/api/blogs');
        setBlogs(response.data);
      } catch (err) {
        setError('Failed to fetch blogs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="blog-list-container">
      <h2>Published Blogs</h2>
      {blogs.length === 0 ? (
        <p>No published blogs available.</p>
      ) : (
        <div className="blog-list">
          {blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              {blog.image && (
                <img
                  src={`${blog.image}`} // Adjust URL if needed
                  alt={blog.title}
                  className="blog-banner-image"
                />
              )}
              <div className="blog-card-content">
                <h6>
                  <Link to={`/blog/${blog._id}`}>{blog.title}</Link> {/* Link to blog detail */}
                </h6>
                <div className="blog-card-actions">
                  <button onClick={() => handleEdit(blog._id)} className="edit-button">
                    Edit
                  </button>
                  <button onClick={() => handleUnpublish(blog._id)} className="delete-button">
                    Unpublish
                  </button>
                </div>

                {/* <p>{blog.subtitle}</p> */}
                {/* <p><strong>Tags:</strong> {blog.tags.join(', ')}</p>
                <p><strong>Published:</strong> {blog.publish ? 'Yes' : 'No'}</p> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
