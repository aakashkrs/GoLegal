import React, { useEffect, useState } from 'react';
import '../css/TermsPopup.css'; // Importing CSS file for styling

const TermsPopup = () => {
    const [isOpen, setIsOpen] = useState(false); // Initially closed

    useEffect(() => {
        // Check if the user has already agreed to the terms
        const hasAgreed = localStorage.getItem('hasAgreedToTerms');

        if (!hasAgreed) {
            // Set a 3-second timer for the popup to appear
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 12000);

            // Clear timer if the component unmounts
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAgree = () => {
        setIsOpen(false);
        localStorage.setItem('hasAgreedToTerms', 'true'); // Store in localStorage that the user has agreed
    };

    return (
        isOpen && (
            <div className="terms-popup-overlay">
                <div className="terms-popup">
                    <h2 className="terms-title">Disclaimer</h2>
                    <div className="terms-content">
                        <p>
                            This website is made to share basic information about <b>Go Legal</b>, not to advertise or ask for legal work.
                            The information here isn't legal advice and won't create a lawyer-client relationship. Before using any information from here,
                            it's best to get formal legal advice.
                        </p>
                    </div>
                    <div className="terms-actions">
                        <button className="agree-btn" onClick={handleAgree}>
                            Agree
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default TermsPopup;
