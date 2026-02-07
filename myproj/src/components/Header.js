import React from 'react';
import '../css/style.css'; // Import your CSS file
import { Link } from 'react-router-dom';
import logo from '../assets/logos/png/main.png';

const Header = () => {
    return (
        <div>
            {/* Mobile only section */}
            <div className="mobile-top-bar">
                <div className="mobile-social">
                    <a href="x.com/easylegalloffici"><i className="fab fa-twitter"></i></a>
                    <a href="https://www.facebook.com/profile.php?id=615666424562924&mibextid=ZbWKwL"><i className="fab fa-facebook-f"></i></a>
                    <a href="https://www.youtube.com/@EasyLegallofficial"><i className="fab fa-youtube"></i></a>
                    <a href="https://instagram.com/easylegallofficial"><i className="fab fa-instagram"></i></a>
                </div>
                <div className="mobile-buttons">
                    <Link to="/centralized-grievances">
                        <button className="mobile-button">File Complaint</button>
                    </Link>
                    <Link to="/track-complaint">
                        <button className="mobile-button">Track Complaint</button>
                    </Link>
                </div>
                <div className="divider"><hr /></div>
            </div>

            {/* Existing Header Content */}
            <div className="top-bar">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="logo">
                                <a href="/">
                                    { <img src={logo} alt="Logo" /> }
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="top-bar-right">
                                <div className="text">
                                    <h2>24 * 7</h2>
                                    <p>All Working Days</p>
                                </div>
                                |
                                <div className="text">
                                    <h2><a href="tel:+9191687XXXXX">+91 91687XXXXX</a></h2>
                                    <p>Call Us For Consultation</p>
                                </div>
                                |
                                <div className="social">
                                <a href="https://x.com/easylegalloffici" target='_blank'><i className="fab fa-twitter"></i></a>
                                <a href="https://www.facebook.com/profile.php?id=615666424562924&mibextid=ZbWKwL" target='_blank'><i className="fab fa-facebook-f"></i></a>
                                <a href="https://www.youtube.com/@EasyLegallofficial" target='_blank'><i className="fab fa-youtube"></i></a>
                                <a href="https://instagram.com/easylegallofficial" target='_blank'><i className="fab fa-instagram"></i></a>
                                </div>
                                <Link to="/track-complaint">
                                    <button className="contact-button">Track Complaint</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;