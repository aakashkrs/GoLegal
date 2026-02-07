import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/blogSlider.css'; // Import your CSS file

const BlogSlider = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(); // Loading state
    const [error, setError] = useState(null); // Error state

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

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: <button className="slick-prev">‹</button>,
        nextArrow: <button className="slick-next">›</button>,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

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
                <Slider {...settings}>
                    {blogPosts.map(post => (
                        <div key={post._id} className="blog-item">
                            <img src={`${post.image}`} alt="Blog" /> {/* Updated field */}
                            <div className="meta">
                                <i className="fa fa-tags"></i>
                                {post.tags.join(', ')} {/* Display tags */}
                                {post.publish ? <span>Published</span> : <span>Draft</span>} {/* Display publish status */}
                            </div>
                            <p>{post.title.substring(0, 100)}...</p> {/* Display content snippet */}
                            {/* <Link className="btn" to={`/blogDetails/${createSlug(post.title)}/${post._id}`}>
                            Read More <i className="fa fa-angle-right"></i>
                            </Link> */}
                            <a className="btn" href={`/blogDetails/${createSlug(post.title)}/${post._id}`}>
                                Read More <i className="fa fa-angle-right"></i>
                            </a>
                            {/* <a className="btn" href="#">Read More <i className="fa fa-angle-right"></i></a> */}
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default BlogSlider;
