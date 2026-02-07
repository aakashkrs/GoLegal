// BlogDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/blogDetail.css'; // Import custom styles if needed

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://serve-d3eo.onrender.com/api/blogs/${id}`);
        setBlog(response.data);
      } catch (err) {
        setError('Failed to fetch blog details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading blog details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="blog-detail-container">
      {blog && (
        <>
          {/* {blog.image && (
            <img
              src={`https://serve-d3eo.onrender.com/uploads/${blog.image}`} // Adjust URL if needed
              alt={blog.title}
              className="blog-detail-image"
            />
          )} */}
          <h5>{blog.title}</h5>
          <h6>{blog.subtitle}</h6>
          {/* <p><strong>Published:</strong> {blog.publish ? 'Yes' : 'No'}</p> */}
          <div className="blog-detail-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
          <p><strong>Tags:</strong> {blog.tags.join(', ')}</p>
        </>
      )}
    </div>
  );
};

export default BlogDetail;
