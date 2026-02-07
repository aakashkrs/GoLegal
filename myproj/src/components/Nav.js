import React from 'react';
import '../css/style.css'; // Import your CSS file

const Nav = () => {
    return (
        <div className="nav-bar">
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg">
                    
                    {/* Logo */} 
                    <a href="/" className="navbar-brand">
                        <img src={require('../assets/logos/png/mainlogo.png')} alt="Logo" width="120" height="35" />
                    </a>

                    {/* Menu Toggle Button */}
                    <button className="navbar-toggler menu-mobile" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>

                    {/* Navbar Links */}
                    <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div className="navbar-nav">
                            <a href="/" className="nav-item nav-link">Home</a>
                            <a href="/About" className="nav-item nav-link">About Us</a>
                            {/* {<div className="nav-item dropdown"> */}
                                {/* {<a href="#" className="nav-link dropdown-toggle" id="servicesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                                    {/* {Services */}
                                {/* {</a>} */}
                                {/* <div className="dropdown-menu" aria-labelledby="servicesDropdown"> */}
                                    {/* {<a href="/centralized-grievances" className="dropdown-item">Centralized Grievance</a>} */}
                                      {/* <a href="/state-specific-grievances" className="dropdown-item">State Specific Grievances</a> */}
                                {/* </div>
                            </div> */}
                            {/* {<a href="/Resources" className="nav-item nav-link">Resources</a>} */}
                            <a href="/Blog" className="nav-item nav-link">Blog</a>
                            <a href="/Contact" className="nav-item nav-link">Contact</a>
                        </div>
                        <div className="navbar-nav ml-auto">
                            <a className="btn btn-primary" href="/centralized-grievances">File Complaint</a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Nav;