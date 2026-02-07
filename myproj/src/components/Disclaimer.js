import React from 'react';
import '../css/ServicesTabs.css'; // Import your CSS file

const DisclaimerSection = () => {
    return (
        <div className="disclaimer-section">
            <marquee direction="left" behavior="scroll" scrollamount="5">
                <p>
                    <b>Disclaimer:</b> This website is made to share basic information about <b>Go Legal</b>, not to advertise or ask for legal work.
                    The information here isn't legal advice and won't create a lawyer-client relationship. Before using any information from here,
                    it's best to get formal legal advice.
                </p>
            </marquee>
        </div>
    );
};

export default DisclaimerSection;