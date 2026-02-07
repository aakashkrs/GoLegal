import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom'; // Import useParams
import '../css/blogDetails.css'; // Import your CSS file

const BlogDetails = () => {
    const { slug, id } = useParams(); // Get the blog ID from URL params
    const location = useLocation();
    const [blogPost, setBlogPost] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [loading, setLoading] = useState(); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await axios.get(`https://serve-d3eo.onrender.com/api/blogs/${id}`);
                setBlogPost(response.data);

                // Fetch related blogs (excluding the current one)
                const relatedResponse = await axios.get(`https://serve-d3eo.onrender.com/api/blogs?exclude=${id}`);
                const blogs = relatedResponse.data.slice(0, 10);
                setRelatedBlogs(blogs);
            } catch (error) {
                console.error('Error fetching blog details:', error);
                setError('Error fetching blog details');
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchBlogDetails();
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on component mount or ID change
    }, [location]);

    // Load the AdSense script dynamically after the component renders
    useEffect(() => {
        const adsScript = document.createElement('script');
        adsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2666968885960053';
        adsScript.crossOrigin = 'anonymous';
        adsScript.async = true;
        document.body.appendChild(adsScript);

        return () => {
            document.body.removeChild(adsScript);
        };
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
        <div className="container-blog">
            <div className="single">
                {blogPost && (
                    <>
                        <h1>{blogPost.title}</h1>
                        <div className="blog-detail-content" dangerouslySetInnerHTML={{ __html: blogPost.content }} />
                    </>
                )}
            </div>

            {/* AdSense Block: Add Google AdSense ad */}
            <div className="adsense-container">
                <ins className="adsbygoogle"
                     style={{ display: "block" }}
                     data-ad-format="fluid"
                     data-ad-layout-key="-6f+cn+50-s-46"
                     data-ad-client="ca-pub-2666968885960053"
                     data-ad-slot="8426500605"></ins>
            </div>

            <div className="related-blogs">
                <h2>Related Blogs</h2>
                <ul>
                    {relatedBlogs.map(blog => (
                        <li key={blog._id}>
                            <img src={`${blog.image}`} alt="Blog" />
                            <a href={`/blogDetails/${createSlug(blog.title)}/${blog._id}`}>
                                <p>{blog.title.substring(0, 70)}...</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BlogDetails;
