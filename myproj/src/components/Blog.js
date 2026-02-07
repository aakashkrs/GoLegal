import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/style.css'; // Import your CSS file

const Blog = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Adsense code
    useEffect(() => {
         const loadAds = () => {
           try {
             if (window.adsbygoogle && window.adsbygoogle.push) {
               window.adsbygoogle.push({});
             }
           } catch (err) {
             console.error('AdSense error:', err);
           }
         };
     
         // Call loadAds after a short delay to ensure DOM is ready
         const timer = setTimeout(loadAds, 1000);
         return () => clearTimeout(timer);
     }, []);
     
    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await axios.get('https://serve-d3eo.onrender.com/api/blogs');
                console.log('Fetched blog posts:', response.data); // Log data to inspect
                setBlogPosts(response.data);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
                setError('Error fetching blog posts');
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchBlogPosts();
    }, []);

    const createSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
            .replace(/^-|-$/g, ''); // Remove leading and trailing hyphens
    };

    if (loading) return <p>Loading...</p>; // Display loading state
    if (error) return <p>{error}</p>; // Display error state

    return (
        <div className="blog">
            <div className="container">
                <div className="section-header">
                    <h2>Latest From Blog</h2>
                </div>

                {/* Ad Banner */}
                <div className="ad-container">
                    <ins
                        className="adsbygoogle"
                        style={{
                            display: 'inline-block',
                            width: '728px',
                            height: '90px'
                        }}
                        data-ad-client="ca-pub-2666968885960053"
                        data-ad-slot="2323206811"
                    />
                </div>

                {/* Blog posts */}
                <div className="row blog-page">
                    {blogPosts.map(post => (
                        <div key={post._id} className="col-lg-4 col-md-6 blog-item">
                            <img src={`${post.image}`} alt="Blog" /> {/* Updated field */}
                            <div className="meta">
                                <i className="fa fa-tags"></i>
                                {post.tags.join(', ')} {/* Display tags */}
                                {post.publish ? <span>Published</span> : <span>Draft</span>} {/* Display publish status */}
                            </div>
                            <p>{post.title.substring(0, 100)}...</p> {/* Display content snippet */}
                            <Link className="btn" to={`/blogDetails/${createSlug(post.title)}/${post._id}`}>
                                Read More <i className="fa fa-angle-right"></i>
                            </Link>
                        </div>
                    ))}
                </div>
                      
            </div>
        </div>
             
    );
};

export default Blog;
