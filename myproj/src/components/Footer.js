import React from 'react';

const Footer = () => {
    return (
        <footer>
            {/* Footer content */}
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-4">
                            <div className="footer-about">
                                <h2>About Us</h2>
                                <p>
                                    Welcome to Go Legal - your compass in navigating the complex landscape of legalities with ease and confidence. At Go Legal, we are your trusted allies, offering a multifaceted platform designed to empower and inform.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-8">
                            <div className="row">
                                <div className="col-md-6 col-lg-4">
                                    <div className="footer-link">
                                        <h2>Services Areas</h2>
                                        {/* Added links from the navbar */}
                                        <a href="/centralized-grievances">File Complaint</a>
                                        <a href="/Track-complaint">Track Complaint</a>
                                       {/* { <a href="#">Cybercrime</a> */}
                                        {/* {<a href="#">Women & Child Grievance</a>} */}
                                        {/* {<a href="#">Legal Services</a>} */}
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="footer-link">
                                        <h2>Useful Pages</h2>
                                        {/* Added links from the navbar */}
                                        <a href="/">Home</a>
                                        <a href="/About">About Us</a>
                                      {/* {  <a href="/Resources">Resources</a>} */}
                                        <a href="/Blog">Blog</a>
                                        <a href="/Contact">Contact</a>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="footer-contact">
                                        <h2>Get In Touch</h2>
                                        <p><i className="fa fa-map-marker-alt"></i>I.P. Extension, Delhi</p>
                                        <p><i className="fa fa-phone-alt"></i><a href="tel:+918168792409">+91 8168792409</a></p>
                                        <p><i className="fa fa-envelope"></i><a href="mailto:Golegal.co.in@gmail.com">Golegal.co.in@gmail.com</a></p>
                                        <div className="footer-social">
                                        <a href="x.com/easylegaloffici" target='_blank'><i className="fab fa-twitter"></i></a>
                                        <a href="https://www.facebook.com/profile.php?id=61566424562924&mibextid=ZbWKwL" target='_blank'><i className="fab fa-facebook-f"></i></a>
                                        <a href="https://www.youtube.com/@EasyLegalofficial" target='_blank'><i className="fab fa-youtube"></i></a>
                                        <a href="https://instagram.com/easylegalofficial" target='_blank'><i className="fab fa-instagram"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container footer-menu">
                    <div className="f-menu">
                        <a href="#">Terms of use</a>
                        <a href="/PrivacyPolicy">Privacy policy</a>
                    </div>
                </div>
                <div className="container copyright">
                    <div className="row">
                        <div className="col-md-6">
                            <p>&copy; <a href="#">Go Legal</a>, All Right Reserved.</p>
                        </div>
                        <div className="col-md-6">
                            <p>Designed By <a href="https://designthesite.com">Crafters</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;