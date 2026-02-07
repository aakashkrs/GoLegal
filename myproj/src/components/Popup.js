import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/ServicesTabs.css'; // Import the CSS file

const Popup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Only show popup on the home page
        if (location.pathname === '/') {
            const timer = setTimeout(() => {
                setShowPopup(true);
            }, 10000); // 10000ms = 10s

            // Clear the timer if the component unmounts
            return () => clearTimeout(timer);
        }
    }, [location.pathname]);

    const handleClose = () => {
        setShowPopup(false);
    };

    const handleConnectNow = () => {
        // Handle the "Connect Now" action here
        // For example, redirect to a contact page or open a contact form
        window.location.href = '/centralized-grievances'; // Example redirect
    };

    return (
        <>
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h2 className="popup-title">Having Trouble Filing a Complaint?</h2>
                        <p className="popup-body">
                            If you're finding it difficult to submit your complaint, don't worry—our team of experts is here to assist you. Simply let us know, and we will handle the process for you.
                        </p>
                        <div className="popup-steps">
                            <h3 className="popup-steps-title">How it works:</h3>
                            <ol className="popup-steps-list">
                                <li className="popup-step">
                                    <strong>Reach Out:</strong> Contact us with your issue.
                                </li>
                                <li className="popup-step">
                                    <strong>Expert Review:</strong> Our specialists will review your concern.
                                </li>
                                <li className="popup-step">
                                    <strong>Resolution:</strong> We will proceed with your complaint and keep you informed every step of the way.
                                </li>
                            </ol>
                        </div>
                        <p className="popup-footer">
                            Your satisfaction is our priority, and we are committed to resolving your issues efficiently.
                        </p>
                        <p className="popup-contact">
                            Feel free to get in touch with us if you need any help!
                        </p>
                        <div className="popup-buttons">
                            <button className="popup-button close-button" onClick={handleClose}>Close</button>
                            <button className="popup-button connect-button" onClick={handleConnectNow}>Connect Now</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Popup;
