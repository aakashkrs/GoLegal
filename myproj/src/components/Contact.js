import React, { useEffect } from 'react';
import '../css/style.css'; // Import your CSS file

const Contact = () => {
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
     
    return (
        <div className="contact">
            <div className="container">
            <div className="section-header">
                    <h2>Contact Us</h2>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="contact-form">
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Your Name" required="required" />
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="Your Email" required="required" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Subject" required="required" />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" placeholder="Message" required="required" ></textarea>
                                </div>
                                <div>
                                    <button className="btn" type="submit">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="contact-info">
                            <div className="contact-item">
                                <i className="fa fa-map-marker-alt"></i>
                                <div className="contact-text">
                                    <h2>Location</h2>
                                    <p>69, 1st Floor Astha Kunj, DDA Flat, Ashoka Pahari, Faiz Road, Karol Bagh, Delhi</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <i className="fa fa-phone-alt"></i>
                                <div className="contact-text">
                                    <h2>Phone</h2>
                                    <p><a href="tel:+918168792409">+91 8168792409</a>
                                    </p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <i className="fa fa-envelope"></i>
                                <div className="contact-text">
                                    <h2>Email</h2>
                                    <p><a href="mailto:easylegal.co.in@gmail.com">easylegal.co.in@gmail.com</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              {/* AdSense Container */}
             <div className="mt-12 mx-auto" style={{ maxWidth: '728px' }}>
                    <ins
                      className="adsbygoogle"
                      style={{
                        display: 'block',
                        width: '728px',
                        height: '90px',
                        margin: '0 auto'
                      }}
                      data-ad-client="ca-pub-2666968885960053"
                      data-ad-slot="2323206811"
                    />
             </div>
                           
            </div>             
        </div>
    );
};

export default Contact;
